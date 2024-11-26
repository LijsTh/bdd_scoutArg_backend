import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/database/firebase/firebase.service';

@Injectable()
export class TeamOpinionsCommentsRepository {
    private teamOpinionsCollection: FirebaseFirestore.CollectionReference;

    constructor(private firebaseService: FirebaseService) {}

    async onModuleInit() {
        this.teamOpinionsCollection = this.firebaseService.teamOpinionsCollection;
    }

    // -------------------------- Team Opinions --------------------------//

    async createOpinion(opinion: any) {
        const docRef = await this.teamOpinionsCollection.add(opinion);
        return { id: docRef.id, ...opinion };
    }

    async getOpinionById(id: string) {
        const doc = await this.teamOpinionsCollection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async getOpinions() {
        const snapshot = await this.teamOpinionsCollection.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async updateOpinion(id: string, opinion: any) {
        await this.teamOpinionsCollection.doc(id).update(opinion);
        return { id, ...opinion };
    }

    async deleteOpinion(id: string) {
        await this.teamOpinionsCollection.doc(id).delete();
        return { message: `Opinion with ID ${id} deleted` };
    }

    // -------------------------- Team Comments --------------------------//

    async addComment(opinionId: string, comment: any) {
        const commentsRef = this.teamOpinionsCollection.doc(opinionId).collection('comments');
        return commentsRef.add(comment);
    }

    async getCommentsForOpinion(opinionId: string) {
        const snapshot = await this.teamOpinionsCollection.doc(opinionId).collection('comments').get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async updateComment(opinionId: string, commentId: string, comment: any) {
        await this.teamOpinionsCollection.doc(opinionId).collection('comments').doc(commentId).update(comment);
        return { id: commentId, ...comment };
    }

    async deleteComment(opinionId: string, commentId: string) {
        await this.teamOpinionsCollection.doc(opinionId).collection('comments').doc(commentId).delete();
        return { message: `Comment with ID ${commentId} deleted` };
    }
}
