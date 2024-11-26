import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

@Injectable()
export class FirebaseService implements OnModuleInit {
    public firestoreDB: FirebaseFirestore.Firestore;
    public teamOpinionsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
    public playerOpinionsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    async onModuleInit() {
        try {
            const firebaseApp = initializeApp({
                credential: applicationDefault(),
            });

            this.firestoreDB = admin.firestore();
            this.teamOpinionsCollection = this.firestoreDB.collection('team_opinions');
            this.playerOpinionsCollection = this.firestoreDB.collection('player_opinions');
        } catch (error) {
            console.error('Error initializing Firebase:', error);
            throw new Error('Failed to initialize Firebase');
        }
    }
}
