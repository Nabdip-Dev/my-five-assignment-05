if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// lebel ar color and icon add 
const labelStyles = {
    'bug': {
        color: 'bg-red-100 text-red-600 border-red-300',
        icon: '<i class="fa-solid fa-bug"></i>'
    },
    'help wanted': {
        color: 'bg-blue-100 text-blue-600 border-blue-300',
        icon: '<i class="fa-solid fa-life-ring"></i>'
    },
    'enhancement': {
        color: 'bg-purple-100 text-purple-600 border-purple-300',
        icon: '<i class="fa-solid fa-magic"></i>'
    },
    'good first issue': {
        color: 'bg-green-100 text-green-600 border-green-300',
        icon: '<i class="fa-solid fa-seedling"></i>'
    },
    'documentation': {
        color: 'bg-yellow-100 text-yellow-600 border-yellow-300',
        icon: '<i class="fa-solid fa-book"></i>'
    }
};


// step-4 modal show kora
const loadWordDetils = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const data = await res.json();

    const card = data.data.find(c => c.id === id);
    if (!card) {
        alert(`Issue with ID ${id} not found!`);
        return;
    }

    detilsDisplay(card);
}


// step-1 -- all card show sob somoy ar jonno
const loadAllCard = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then((res) => res.json())
        .then((card) => {
            displayCard(card.data)
        });
}

// step-5 --search funcation kaj
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {

            const filtered = data.data.filter(card =>
                card.title.toLowerCase().includes(searchText) ||
                card.description.toLowerCase().includes(searchText) ||
                card.author.toLowerCase().includes(searchText)
            );

            displayCard(filtered);
        });
});


// step-3----tab button click ar por dakano
const loadCardByStatus = (event, status) => {
    const buttons = document.querySelectorAll("#tab-btn button");
    buttons.forEach(b => {
        b.classList.remove("bg-[#4A00FF]", "text-white");
    });

    // clicked button a color add
    event.target.classList.add("bg-[#4A00FF]", "text-white");

    const container = document.getElementById("card-container");
    container.innerHTML = `<span class="loading loading-spinner loading-xl mx-auto col-span-3"></span>`;



    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            const filtered = status === 'all' ? data.data : data.data.filter(c => c.status === status);
            displayCard(filtered);
        });
}


// step-2----api theke card show kora
const displayCard = (cards) => {
    // console.log(lessons);
    const cardCont = document.getElementById("card-container")
    cardCont.innerHTML = "";

    const countEl = document.getElementById("issue-count");
    countEl.innerHTML = `<span class="font-bold">${cards.length}</span> Issues`;

    for (let card of cards) {
        const plantDiv = document.createElement('div')
        plantDiv.innerHTML = `
         <div onclick="loadWordDetils(${card.id})" class="max-w-sm h-full bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${card.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}">

                        <div class="p-5 space-y-4">

                            <!-- Top -->
                            <div class="flex justify-between items-center">
                                <img src="${card.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">

                               <span class="px-3 py-1 rounded-full text-sm font-semibold
                               ${card.priority === 'high' ? 'bg-red-100 text-red-600' : card.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : card.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' : 'bg-gray-100 text-gray-600'}"> ${card.priority.toUpperCase()} </span>
                            </div>

                            <!-- Title -->
                            <h2 class="text-xl font-bold text-gray-800">
                                ${card.title}
                            </h2>

                            <!-- Description -->
                            <p class="text-gray-500 text-sm">
                               ${card.description}
                            </p>

                            <!-- Tags -->
                           <div class="flex gap-3 flex-wrap">
                            ${card.labels.map(label => {
            const style = labelStyles[label.toLowerCase()] || {
                color: 'bg-gray-100 text-gray-600 border-gray-300',
                icon: ''
            };
            return `
                                    <span class="px-3 py-1 text-sm rounded-full border ${style.color}">
                                    ${style.icon} ${label.toUpperCase()}
                                    </span>
                                `;
        }).join('')}
                            </div>
                        </div>

                        <!-- nicher-->
                        <div class="border-t px-5 py-3 text-sm text-gray-500">
                            <p>#1 by ${card.author.toUpperCase()}</p>
                            <p>${card.createdAt}</p>
                        </div>

                    </div>
        `
        cardCont.appendChild(plantDiv)
    }
}
loadAllCard()


// step-4.1 modal show kora
const detilsDisplay = (card) => {
    console.log(card);
    const detilsBox = document.getElementById("detils-container")
    detilsBox.innerHTML = `
                   <div class="mb-4 space-y-4">
                        <h2 class="text-xl font-semibold text-gray-800">${card.title}</h2>
                        <div class="flex flex-col md:flex-row items-start md:items-center mt-1 gap-2">
                           <span class="px-3 py-1 rounded-full text-white text-sm font-semibold ${card.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#A855F7]'}">${card.status.toUpperCase()}</span>
                            <span class="text-gray-500 text-sm">• Opened by ${card.assignee ? `${card.assignee.toUpperCase()}` : `${card.author.toUpperCase()}`} • ${card.updatedAt}</span>
                        </div>
                        <div class="flex gap-3 flex-wrap">
                            ${card.labels.map(label => {
        const style = labelStyles[label.toLowerCase()] || {
            color: 'bg-gray-100 text-gray-600 border-gray-300',
            icon: ''
        };
        return `
                                                        <span class="px-3 py-1 text-sm rounded-full border ${style.color}">
                                                        ${style.icon} ${label.toUpperCase()}
                                                        </span>
                                                    `;
    }).join('')}
                        </div>
                    </div>

                    <p class="text-[#64748B] mb-4">
                        ${card.description}
                    </p>


                    <div class="flex justify-between items-center rounded bg-[#F8FAFC] p-3">
                        <div class="flex-1">
                            <p class="text-gray-500 text-sm">Assignee:</p>
                            <p class="font-semibold text-gray-800">${card.assignee ? `${card.assignee.toUpperCase()}` : `${card.author.toUpperCase()}`}</p>
                        </div>
                        <div class="flex-1 space-y-2">
                            <p class="text-gray-500 text-sm">Priority:</p>
                            <span class="px-3 py-1 rounded-full text-sm font-semibold
                               ${card.priority === 'high' ? 'bg-red-100 text-red-600' : card.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : card.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' : 'bg-gray-100 text-gray-600'}"> ${card.priority.toUpperCase()} 
                            </span>
                        </div>
                    </div>
    `
    document.getElementById("word_modal").showModal()
}