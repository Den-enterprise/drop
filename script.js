const chatBox = document.getElementById("chat-box");

let step = 0;
let userSelections = {};

const outfits = [
  { id: 1, name: "Pink Shirt + White Cargo", occasion: "College", style: "Gen Z", image: "images/pink-shirt.jpg" },
  { id: 2, name: "Blazer & Pants Set", occasion: "Office", style: "Classic", image: "images/blazer-set.jpg" },
  { id: 3, name: "Party Dress", occasion: "Party", style: "Minimalist", image: "images/party-dress.jpg" },
  { id: 4, name: "Denim Jacket + Black Jeans", occasion: "College", style: "Classic", image: "images/denim-jacket.jpg" },
  { id: 5, name: "Casual Polo + Chinos", occasion: "Office", style: "Minimalist", image: "images/polo-chinos.jpg" },
  { id: 6, name: "Sequined Top + Skirt", occasion: "Party", style: "Gen Z", image: "images/sequin-top.jpg" },
  { id: 7, name: "Oversized Hoodie + Cargo Pants", occasion: "College", style: "Minimalist", image: "images/hoodie-cargo.jpg" },
  { id: 8, name: "Formal Shirt + Trousers", occasion: "Office", style: "Gen Z", image: "images/formal-shirt.jpg" },
  { id: 9, name: "Satin Dress", occasion: "Party", style: "Classic", image: "images/satin-dress.jpg" }
];


function botMessage(text, choices = []) {
  const msg = document.createElement("div");
  msg.classList.add("message", "bot");
  msg.innerHTML = text;
  chatBox.appendChild(msg);

  if (choices.length > 0) {
    const btnContainer = document.createElement("div");
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.innerText = choice;
      btn.classList.add("choice-btn");
      btn.onclick = () => handleChoice(choice);
      btnContainer.appendChild(btn);
    });
    chatBox.appendChild(btnContainer);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function userMessage(text) {
  const msg = document.createElement("div");
  msg.classList.add("message", "user");
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleChoice(choice) {
  userMessage(choice);

  if (step === 0) {
    userSelections.occasion = choice;
    step++;
    setTimeout(() => botMessage("And your style preference?", ["Gen Z", "Minimalist", "Classic"]), 500);
  } else if (step === 1) {
    userSelections.style = choice;
    step++;
    setTimeout(showOutfits, 500);
  }
}

function showOutfits() {
  botMessage("Here are your outfit suggestions for the week:");

  const filtered = outfits.filter(o =>
    o.occasion === userSelections.occasion && o.style === userSelections.style
  );

  if (filtered.length === 0) {
    botMessage("Oops! I couldn't find matching outfits. Try different choices.");
    return;
  }

  filtered.forEach(o => {
    const msg = document.createElement("div");
    msg.classList.add("message", "bot");
    msg.innerHTML = `<strong>${o.name}</strong><br><img src="${o.image}" class="outfit-img">`;
    chatBox.appendChild(msg);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Start the chat
botMessage("Hi! I’m your style assistant 👗 What’s the occasion?", ["Office", "College", "Party"]);
