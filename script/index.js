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


// step-1 -- all card show sob somoy ar jonno
const loadAllCard = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then((res) => res.json())
        .then((card) => {
            displayCard(card.data)
        });
}


// step-3----tab button click ar por dakano
const loadCardByStatus = (status) => {
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
    countEl.textContent = `${cards.length} Issues`;
    for (let card of cards) {
        const plantDiv = document.createElement('div')
        plantDiv.innerHTML = `
         <div class="max-w-sm h-full bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${card.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}">

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
                            <p>#1 by ${card.author}</p>
                            <p>${card.createdAt}</p>
                        </div>

                    </div>
        `
        cardCont.appendChild(plantDiv)
    }
}
loadAllCard()
