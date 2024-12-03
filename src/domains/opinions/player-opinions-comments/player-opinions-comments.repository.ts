import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/database/firebase/firebase.service';
import { CreatePlayerOpinionDto } from './opinions_dtos/create-player-opinion.dto';
import { UpdatePlayerOpinionDto } from './opinions_dtos/update-player-opinion.dto';
import { CreatePlayerCommentDto } from './comments_dtos/create-player-comment.dto';

@Injectable()
export class PlayersOpinionsCommentsRepository {
    private playerOpinionsCollection: FirebaseFirestore.CollectionReference;
    private playerCommentsCollection: FirebaseFirestore.CollectionReference;

    constructor(private firebaseService: FirebaseService) {}

    async onModuleInit() {
        this.playerOpinionsCollection = this.firebaseService.playerOpinionsCollection;
        this.playerCommentsCollection = this.firebaseService.playerCommentsCollection;
    }

    // -------------------------- Player Opinions --------------------------//

    async createOpinion(opinion: CreatePlayerOpinionDto): Promise<any> {
        const plainOpinion = JSON.parse(JSON.stringify(opinion));
        const docRef = await this.playerOpinionsCollection.add(plainOpinion);
        return { id: docRef.id, ...opinion };
    }

    async getOpinionById(id: string): Promise<any> {
        const doc = await this.playerOpinionsCollection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async getOpinionsByPlayerId(playerId: string): Promise<any[]> {
        const snapshot = await this.playerOpinionsCollection.where('player_id', '==', playerId).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async getOpinions(): Promise<any[]> {
        const snapshot = await this.playerOpinionsCollection.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async updateOpinion(id: string, opinion: UpdatePlayerOpinionDto): Promise<any> {
        const plainOpinion = JSON.parse(JSON.stringify(opinion));
        await this.playerOpinionsCollection.doc(id).update(plainOpinion);
        return { id, ...opinion };
    }

    async deleteOpinion(id: string): Promise<any> {
        const docRef = this.playerOpinionsCollection.doc(id);
        const docSnapshot = await docRef.get();
        const deletedID = docSnapshot.id;
        const deletedData = docSnapshot.data();
        await docRef.delete();
        return { id: deletedID, ...deletedData };
    }

    // -------------------------- Player Comments --------------------------//

    async addComment(comment: CreatePlayerCommentDto): Promise<any> {
        const plainComment = JSON.parse(JSON.stringify(comment));
        const commentsRef = await this.playerCommentsCollection.add(plainComment);
        return { id: commentsRef.id, ...comment };
    }

    async getCommentsForOpinion(opinionId: string): Promise<any[]> {
        const snapshot = await this.playerCommentsCollection.where('opinion_id', '==', opinionId).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async getCommentByIdForOpinion(opinionId: string, commentId: string): Promise<any> {
        const commentRef = this.playerCommentsCollection.doc(commentId);
        const commentSnapshot = await commentRef.get();
        const commentData = commentSnapshot.data();
        if (!commentData || commentData.opinion_id !== opinionId) {
            return null;
        }
        return commentSnapshot.exists ? { id: commentSnapshot.id, ...commentData } : null;
    }

    async updateComment(opinionId: string, commentId: string, comment: any): Promise<any> {
        const plainComment = JSON.parse(JSON.stringify(comment));
        const commentRef = this.playerCommentsCollection.doc(commentId);
        const commentSnapshot = await commentRef.get();
        const commentData = commentSnapshot.data();
        if (!commentData || commentData.opinion_id !== opinionId) {
            return null;
        }
        await commentRef.update(plainComment);
    }

    async deleteComment(opinionId: string, commentId: string): Promise<any> {
        const commentRef = this.playerCommentsCollection.doc(commentId);
        const commentSnapshot = await commentRef.get();
        const commentData = commentSnapshot.data();
        if (!commentData || commentData.opinion_id !== opinionId) {
            return null;
        }
        const deletedID = commentSnapshot.id;
        const deletedData = commentSnapshot.data();
        await commentRef.delete();
        return { id: deletedID, ...deletedData };
    }
}
