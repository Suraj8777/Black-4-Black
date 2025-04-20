// Mock Data
const users = [
    { id: 1, name: "User1", channelId: "UC_user1", subscriberCount: 100, img: "https://via.placeholder.com/100" },
    { id: 2, name: "User2", channelId: "UC_user2", subscriberCount: 200, img: "https://via.placeholder.com/100" },
    { id: 3, name: "User3", channelId: "UC_user3", subscriberCount: 150, img: "https://via.placeholder.com/100" }
];

let requests = [];
let currentUser = null;

// Load Users List
function loadUsersList() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    users.forEach(user => {
        if (user.id !== currentUser.id) {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <img src="${user.img}" alt="${user.name}">
                <h3>${user.name}</h3>
                <p>Subscribers: ${user.subscriberCount}</p>
                <button onclick="sendRequest(${user.id})">Send Request</button>
            `;
            usersList.appendChild(card);
        }
    });
}

// Send Subscription Request
function sendRequest(receiverId) {
    const existingRequest = requests.find(r => r.senderId === currentUser.id && r.receiverId === receiverId);
    if (!existingRequest) {
        requests.push({ senderId: currentUser.id, receiverId, status: 'pending' });
        alert(`Subscription request sent to ${users.find(u => u.id === receiverId).name}!`);
        loadRequests();
    } else {
        alert('Request already sent!');
    }
}

// Load Requests
function loadRequests() {
    const incomingRequests = document.getElementById('incoming-requests');
    const outgoingRequests = document.getElementById('outgoing-requests');
    incomingRequests.innerHTML = '';
    outgoingRequests.innerHTML = '';

    requests.forEach(req => {
        const sender = users.find(u => u.id === req.senderId);
        const receiver = users.find(u => u.id === req.receiverId);

        if (req.receiverId === currentUser.id && req.status === 'pending') {
            const div = document.createElement('div');
            div.className = 'request';
            div.innerHTML = `
                <p>From: ${sender.name}</p>
                <div>
                    <button onclick="acceptRequest(${req.senderId}, ${req.receiverId})">Accept</button>
                    <button onclick="declineRequest(${req.senderId}, ${req.receiverId})">Decline</button>
                </div>
            `;
            incomingRequests.appendChild(div);
        } else if (req.senderId === currentUser.id) {
            const div = document.createElement('div');
            div.className = 'request';
            div.innerHTML = `
                <p>To: ${receiver.name} | Status: ${req.status}</p>
            `;
            outgoingRequests.appendChild(div);
        }
    });
}

// Accept Request
function acceptRequest(senderId, receiverId) {
    const request = requests.find(r => r.senderId === senderId && r.receiverId === receiverId);
    if (request) {
        request.status = 'accepted';
        const sender = users.find(u => u.id === senderId);
        const receiver = users.find(u => u.id === receiverId);
        alert(`Please subscribe to ${sender.name}'s channel: https://youtube.com/channel/${sender.channelId}`);
        alert(`${sender.name} should subscribe to your channel: https://youtube.com/channel/${receiver.channelId}`);
        setTimeout(() => {
            request.status = 'completed';
            loadRequests();
            alert('Subscription exchange completed!');
        }, 3000); // Simulate subscription confirmation
    }
}

// Decline Request
function declineRequest(senderId, receiverId) {
    requests = requests.filter(r => !(r.senderId === senderId && r.receiverId === receiverId));
    loadRequests();
}

// Load User Profile
function loadProfile() {
    document.getElementById('profile-img').src = currentUser.img;
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-subscribers').textContent = currentUser.subscriberCount;
}

// Navigation Handlers
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('requests-section').style.display = 'none';
    loadUsersList();
});

document.getElementById('requests-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('requests-section').style.display = 'block';
    loadRequests();
});

document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    currentUser = null;
    alert('Logged out!');
    location.reload();
});

// Simulated Login (Select User 1 for Demo)
function login(userId) {
    currentUser = users.find(u => u.id === userId);
    loadProfile();
    loadUsersList();
    document.getElementById('home-section').style.display = 'block';
}

// Initialize with User 1
login(1);
