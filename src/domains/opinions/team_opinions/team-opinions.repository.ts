import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/database/firebase/firebase.service';
// import firestoreDB from 'src/database/firebase/firebase.config';

@Injectable()
export class TeamOpinionsRepository {
    private teamOpinionsCollection: FirebaseFirestore.CollectionReference;

    constructor(private firebaseService: FirebaseService) {}

    async onModuleInit() {
        this.teamOpinionsCollection = this.firebaseService.teamOpinionsCollection;
    }

    async create(data: any) {
        const docRef = await this.teamOpinionsCollection.add(data);
        return { id: docRef.id, ...data };
    }

    async findAll() {
        const snapshot = await this.teamOpinionsCollection.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }

    async findOne(id: string) {
        const doc = await this.teamOpinionsCollection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return { id: doc.id, ...doc.data() };
    }

    async update(id: string, data: any) {
        await this.teamOpinionsCollection.doc(id).update(data);
        return { id, ...data };
    }

    async delete(id: string) {
        await this.teamOpinionsCollection.doc(id).delete();
        return { id };
    }
}
