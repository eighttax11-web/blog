export class Post {
    constructor(
        public id: string,
        public user_id: number,
        public category_id: number,
        public title: string,
        public content: string,
        public image: string,
        public createdAt: any
    ) {

    }
}