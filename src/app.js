import 'modern-normalize/modern-normalize.css';
import './scss/style.scss';
import {DataStorage} from './dataStorage.js'
import {LocalStorage} from './localStorage'

const localStorage = new LocalStorage();
const dataStorage = new DataStorage();

dataStorage.loadDataBase().then((userList) => {
    generateCardList(userList);
    addButtonHandlers(userList)
});

function generateCardList(userList) {
    const listRef = document.querySelector('.list');

    const createList = ({tweets, avatar, user, id} = {}) => {
        const currentButtonText = getButtonCurrentText(id);
        const currentFollowersText = getFollowerCounterCurrentText(id);
        const buttonActiveStyle = isFollowing(id) ? 'active' : '';


        return `
            <li class="item" id=${id}>
                <img class="logo" src="./images/logo.svg" alt="logo" width="76">
                 <div class="avatar-wrap"> 
                    <img src="./images/framewithback.svg">
                    <img class="avatar" src=${avatar} alt=${user}/>
                </div>
                <div class="info">
                    <p> ${tweets} tweets</p>
                    <p> <span class="followers-counter-${id}">${currentFollowersText}</span> Followers</p>
                </div>
                <button class="btn-follow button-${id} ${buttonActiveStyle}" type="button">${currentButtonText}</button>
            </li>`;
    };

    const listCards = userList.map(createList).join('');
    listRef.insertAdjacentHTML('afterbegin', listCards);
}

function addButtonHandlers(users) {
    for (let user of users) {
        const id = user.id;
        const button = document.querySelector(`.button-${id}`);
        button.addEventListener('click', () => onFollowClick(id));
    }
}

function onFollowClick(userId) {
    const localStorageId = `followingUserId-${userId}`;
    if (localStorage.getValue(localStorageId)) {
        localStorage.setValue(localStorageId, false);
    } else {
        localStorage.setValue(localStorageId, true);
    }

    updateFollowButton(userId);
    updateFollowerCounter(userId);
}

function updateFollowButton(userId) {
    const button = document.querySelector(`.button-${userId}`);
    button.textContent = getButtonCurrentText(userId);
    if (isFollowing(userId)) {
        button.classList.add('active');
    } else {
        button.classList.remove('active')
    }
}

function updateFollowerCounter(userId) {
    const counter = document.querySelector(`.followers-counter-${userId}`);
    counter.textContent = getFollowerCounterCurrentText(userId);
}

function getButtonCurrentText(userId) {
    if (isFollowing(userId)) {
        return 'Following';
    } else {
        return 'Follow';
    }
}

function getFollowerCounterCurrentText(userId) {
    const userInfo = dataStorage.getUserInfoById(userId);
    let sourceCount = userInfo.followers;
    if (isFollowing(userId)) {
        sourceCount++;
    }

    return numberWithCommas(sourceCount)
}

function isFollowing(userId) {
    return localStorage.getValue(`followingUserId-${userId}`, false)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
