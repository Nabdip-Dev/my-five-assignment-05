
const loadCard = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then((res) => res.json())
        .then((card) => {
            displayCard(card.data)
        });
}

// step-2.1
const displayCard = (cards) => {
    // console.log(lessons);
    const cardCont = document.getElementById("card-container")
    cardCont.innerHTML = "";

    for (let card of cards) {
        const plantDiv = document.createElement('div')
        plantDiv.innerHTML = `
         <div class="max-w-sm bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-green-500">

                        <div class="p-5 space-y-4">

                            <!-- Top -->
                            <div class="flex justify-between items-center">
                                <img src="${card.status === 'open'
                                    ? './assets/Open-Status.png'
                                    : './assets/Closed- Status .png'}" alt="">

                                <span
                                    class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    ${card.priority}
                                </span>
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
                                ${card.labels.map(label => `
                                    <span class="px-3 py-1 text-sm border border-red-300 text-red-500 rounded-full">
                                        ${label}
                                    </span>
                                `).join("")}
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
loadCard()
