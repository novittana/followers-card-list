export class DataStorage {
    userList = [];

    async loadDataBase() {
        const response = await fetch(
            './db/db.json'
        );

        let data = await response.json();
        this.userList = data.users;

        return this.userList;
    }

    getUserInfoById(id) {
        for(let user of this.userList) {
            if(user.id === id) {
                return user;
            }
        }
    }
}
