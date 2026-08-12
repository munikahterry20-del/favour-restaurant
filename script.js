const CONFIG = {
  ORDER_ENDPOINT: "https://script.google.com/macros/s/AKfycbx95DPQCFAyJBCO8fB2fpAb1Zox05KpKRrEgh5vpa4qSuYjYdwxxgoDjpwTbF1r0IJK/exec",
  WHATSAPP_NUMBER: "254743879484"
};


/* =========================
   FAVOUR RESTAURANT MENU
========================= */

const menu = [

  /* ---------- BREAKFAST ---------- */

  {
    id: 1,
    cat: "Breakfast",
    name: "Tea",
    desc: "Freshly prepared Kenyan tea.",
    price: 20,
    img: "images/favour-tea.jpeg"
  },

  {
    id: 2,
    cat: "Breakfast",
    name: "Small Tea",
    desc: "A small cup of hot Kenyan tea.",
    price: 15,
    img: "images/favour-smalltea.jpeg"
  },

  {
    id: 3,
    cat: "Breakfast",
    name: "Special Tea",
    desc: "A richer, more special cup of tea.",
    price: 30,
    img: "images/favour-specialtea.jpeg"
  },

  {
    id: 4,
    cat: "Breakfast",
    name: "Milk",
    desc: "Fresh milk served ready to enjoy.",
    price: 50,
    img: "images/favour-milk.jpeg"
  },

  {
    id: 5,
    cat: "Breakfast",
    name: "2 Eggs",
    desc: "Two freshly prepared eggs.",
    price: 50,
    img: "images/favour-eggs.jpeg"
  },

  {
    id: 6,
    cat: "Breakfast",
    name: "Chapati",
    desc: "Soft Kenyan chapati.",
    price: 10,
    img: "images/favour-chapati.jpeg"
  },


  /* ---------- LUNCH ---------- */

  {
    id: 7,
    cat: "Lunch",
    name: "Chapati Stew",
    desc: "Soft chapati served with savoury stew.",
    price: 70,
    img: "images/favour-chapatistew.jpeg"
  },

  {
    id: 8,
    cat: "Lunch",
    name: "Chapati Njahi",
    desc: "Chapati served with nutritious black beans.",
    price: 60,
    img: "images/favour-chapatinjahi.jpeg"
  },

  {
    id: 9,
    cat: "Lunch",
    name: "Chapati Beans",
    desc: "Chapati with tasty beans.",
    price: 50,
    img: "images/favour-chapatibeans.jpeg"
  },

  {
    id: 10,
    cat: "Lunch",
    name: "Stew Plain",
    desc: "A serving of flavourful home-style stew.",
    price: 50,
    img: "images/favout-beefstewjpeg.jpeg"
  },

  {
    id: 11,
    cat: "Lunch",
    name: "Ugali",
    desc: "Classic Kenyan ugali.",
    price: 30,
    img: "images/favour-ugali.jpeg"
  },

  {
    id: 12,
    cat: "Lunch",
    name: "Ugali Matumbo",
    desc: "Ugali served with tasty matumbo.",
    price: 80,
    img: "images/favour-ugalimatumbo.jpeg"
  },

  {
    id: 13,
    cat: "Lunch",
    name: "Matumbo Plain",
    desc: "Tender, well-seasoned matumbo prepared Favour Restaurant style.",
    price: 50,
    img: "images/favor-matumbo.jpeg"
  },

  {
    id: 14,
    cat: "Lunch",
    name: "Ugali Greens",
    desc: "Ugali served with fresh greens.",
    price: 60,
    img: "images/favour-ugaligreens.jpeg"
  },

  {
    id: 15,
    cat: "Lunch",
    name: "Rice Plain",
    desc: "Steamed plain rice.",
    price: 50,
    img: "images/favour-plainricejpeg.jpeg"
  },

  {
    id: 16,
    cat: "Lunch",
    name: "Rice Stew",
    desc: "Rice served with home-style stew.",
    price: 100,
    img: "images/favor-ricestew.jpeg"
  },

  {
    id: 17,
    cat: "Lunch",
    name: "Rice Cabbage/Greens",
    desc: "Rice served with cabbage or greens.",
    price: 80,
    img: "images/favour-ricecabbage.jpeg"
  },

  {
    id: 18,
    cat: "Lunch",
    name: "Githeri",
    desc: "Classic Kenyan githeri.",
    price: 50,
    img: "images/favour-githeri.jpeg"
  },

  {
    id: 19,
    cat: "Lunch",
    name: "Mukimo",
    desc: "Traditional Kenyan mukimo.",
    price: 50,

    /* SAME IMAGE AS MUKIMO CABBAGE/GREENS */
    img: "images/favour-mukimoandcabbage.jpeg"
  },

  {
    id: 20,
    cat: "Lunch",
    name: "Mukimo Cabbage/Greens",
    desc: "Mukimo served with cabbage or greens.",
    price: 80,

    /* SAME IMAGE AS MUKIMO */
    img: "images/favour-mukimoandcabbage.jpeg"
  },

  {
    id: 21,
    cat: "Lunch",
    name: "Mukimo Matumbo",
    desc: "Mukimo served with tasty matumbo.",
    price: 100,
    img: "images/favour-mukimomatumbo.jpeg"
  }

];


/* =========================
   CART
========================= */

let cart = JSON.parse(
  localStorage.getItem("favourCart") || "[]"
);

let activeCategory = "Breakfast";

let lastOrder = null;


/* =========================
   MONEY FORMAT
========================= */

function money(amount) {

  return "KSh " + Number(amount).toLocaleString("en-KE");

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

  localStorage.setItem(
    "favourCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

  const cartCount =
    document.getElementById("cartCount");

  if (cartCount) {

    cartCount.textContent =
      cart.reduce(
        (total, item) => total + item.qty,
        0
      );

  }

}


/* =========================
   CATEGORY
========================= */

function setCategory(category) {

  activeCategory = category;

  const breakfastTab =
    document.getElementById("breakfastTab");

  const lunchTab =
    document.getElementById("lunchTab");


  if (breakfastTab) {

    breakfastTab.classList.toggle(
      "active",
      category === "Breakfast"
    );

  }


  if (lunchTab) {

    lunchTab.classList.toggle(
      "active",
      category === "Lunch"
    );

  }


  renderMenu();

}


/* =========================
   RENDER MENU
========================= */

function renderMenu() {

  const menuGrid =
    document.getElementById("menuGrid");

  if (!menuGrid) return;


  const searchBox =
    document.getElementById("search");

  const search =
    searchBox
      ? searchBox.value.toLowerCase().trim()
      : "";


  const items = menu.filter(item => {

    const matchesCategory =
      item.cat === activeCategory;

    const matchesSearch =
      (
        item.name +
        " " +
        item.desc
      )
      .toLowerCase()
      .includes(search);


    return matchesCategory && matchesSearch;

  });


  if (!items.length) {

    menuGrid.innerHTML = `
      <div class="empty-menu">
        <h3>No meals found</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;

  }


  menuGrid.innerHTML = items.map(item => `

    <article class="menu-card">

      ${
        item.img
        ?
        `
        <img
          src="${item.img}"
          alt="${item.name}"
          class="menu-image"
          loading="lazy"
          onerror="this.style.display='none'"
        >
        `
        :
        `
        <div class="menu-icon">
          🍽️
        </div>
        `
      }

      <div class="menu-info">

        <h3>${item.name}</h3>

        <p>${item.desc}</p>

        <div class="menu-bottom">

          <span class="price">
            ${money(item.price)}
          </span>

          <button
            class="add"
            onclick="addToCart(${item.id})"
          >
            + Add
          </button>

        </div>

      </div>

    </article>

  `).join("");

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  const item =
    cart.find(product => product.id === id);


  if (item) {

    item.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  saveCart();

  renderCart();

  openCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQty(id, amount) {

  const item =
    cart.find(product => product.id === id);


  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(product => product.id !== id);

  }


  saveCart();

  renderCart();

}


/* =========================
   CART TOTAL
========================= */

function cartTotal() {

  return cart.reduce(
    (total, cartItem) => {

      const item =
        menu.find(product =>
          product.id === cartItem.id
        );


      if (!item) return total;


      return total +
        item.price * cartItem.qty;

    },
    0
  );

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

  const cartItems =
    document.getElementById("cartItems");

  if (!cartItems) return;


  if (!cart.length) {

    cartItems.innerHTML = `
      <p>
        Your basket is empty.
        Add something delicious!
      </p>
    `;

  } else {

    cartItems.innerHTML = cart.map(cartItem => {

      const item =
        menu.find(product =>
          product.id === cartItem.id
        );


      if (!item) return "";


      return `

        <div class="cart-row">

          <div>

            <b>
              ${item.name}
            </b>

            <small>
              ${money(item.price)} each
            </small>

          </div>


          <div class="qty">

            <button
              onclick="changeQty(${item.id}, -1)"
            >
              −
            </button>

            <b>
              ${cartItem.qty}
            </b>

            <button
              onclick="changeQty(${item.id}, 1)"
            >
              +
            </button>

          </div>

        </div>

      `;

    }).join("");

  }


  const total =
    money(cartTotal());


  const cartTotalElement =
    document.getElementById("cartTotal");


  const checkoutTotal =
    document.getElementById("checkoutTotal");


  if (cartTotalElement) {

    cartTotalElement.textContent =
      total;

  }


  if (checkoutTotal) {

    checkoutTotal.textContent =
      total;

  }

}


/* =========================
   OPEN CART
========================= */

function openCart() {

  const overlay =
    document.getElementById("cartOverlay");


  if (!overlay) return;


  overlay.classList.remove("hidden");

  renderCart();

}


/* =========================
   CLOSE CART
========================= */

function closeCart(event) {

  const overlay =
    document.getElementById("cartOverlay");


  if (!overlay) return;


  if (
    !event ||
    event.target === overlay
  ) {

    overlay.classList.add("hidden");

  }

}


/* =========================
   OPEN CHECKOUT
========================= */

function openCheckout() {

  if (!cart.length) {

    alert(
      "Please add at least one item to your basket."
    );

    return;

  }


  document
    .getElementById("cartOverlay")
    .classList.add("hidden");


  document
    .getElementById("checkoutOverlay")
    .classList.remove("hidden");


  document
    .getElementById("checkoutTotal")
    .textContent =
    money(cartTotal());

}


/* =========================
   CLOSE CHECKOUT
========================= */

function closeCheckout() {

  document
    .getElementById("checkoutOverlay")
    .classList.add("hidden");

}


/* =========================
   CLOSE SUCCESS
========================= */

function closeSuccess() {

  document
    .getElementById("successOverlay")
    .classList.add("hidden");

}


/* =========================
   ORDER ID
========================= */

function makeOrderId() {

  return "FAV-" +
    Date.now()
      .toString()
      .slice(-6);

}


/* =========================
   SUBMIT ORDER
========================= */

async function submitOrder(event) {

  event.preventDefault();


  const status =
    document.getElementById("status");


  const button =
    document.getElementById("submitBtn");


  if (
    !CONFIG.ORDER_ENDPOINT ||
    CONFIG.ORDER_ENDPOINT.includes("PASTE_")
  ) {

    status.textContent =
      "The Google Sheets order system is not connected.";

    status.style.color = "#a33";

    return;

  }


  button.disabled = true;

  button.textContent =
    "Sending order...";


  const order = {

    orderId: makeOrderId(),

    createdAt:
      new Date().toISOString(),

    customerName:
      document
        .getElementById("customerName")
        .value
        .trim(),

    phone:
      document
        .getElementById("customerPhone")
        .value
        .trim(),

    orderType:
      document
        .getElementById("orderType")
        .value,

    payment:
      document
        .getElementById("payment")
        .value,

    address:
      document
        .getElementById("address")
        .value
        .trim(),

    notes:
      document
        .getElementById("notes")
        .value
        .trim(),

    items:
      cart.map(cartItem => {

        const item =
          menu.find(product =>
            product.id === cartItem.id
          );


        return {

          name: item.name,

          qty: cartItem.qty,

          price: item.price

        };

      }),

    total: cartTotal()

  };


  try {

    const response =
      await fetch(
        CONFIG.ORDER_ENDPOINT,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body:
            JSON.stringify(order)

        }
      );


    const data =
      await response.json();


    if (!data.ok) {

      throw new Error(
        data.error ||
        "Order failed"
      );

    }


    lastOrder = order;


    document
      .getElementById("checkoutOverlay")
      .classList.add("hidden");


    document
      .getElementById("successOverlay")
      .classList.remove("hidden");


    document
      .getElementById("orderCode")
      .textContent =
      order.orderId;


    document
      .getElementById("successText")
      .textContent =
      `Thanks ${order.customerName}. Your ${order.orderType.toLowerCase()} order has been recorded successfully.`;


    cart = [];

    saveCart();


  } catch (error) {

    console.error(
      "Favour Restaurant order error:",
      error
    );


    status.textContent =
      "We could not send the order. Please check your connection and try again.";

    status.style.color =
      "#a33";


    button.disabled = false;

    button.textContent =
      "Place order";

  }

}


/* =========================
   SEND ORDER TO WHATSAPP
========================= */

function sendWhatsApp() {

  if (!lastOrder) {

    return;

  }


  const items =
    lastOrder.items
      .map(item =>
        `${item.qty} × ${item.name}`
      )
      .join("\n");


  const message = `Hello Favour Restaurant,

NEW ORDER: ${lastOrder.orderId}

Customer: ${lastOrder.customerName}

Phone: ${lastOrder.phone}

Order type: ${lastOrder.orderType}

Location/details:
${lastOrder.address}

Items:
${items}

Total:
${money(lastOrder.total)}

Payment:
${lastOrder.payment}

Notes:
${lastOrder.notes}`;


  const url =
    "https://wa.me/" +
    CONFIG.WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank"
  );

}


/* =========================
   PAGE INITIALIZATION
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const year =
      document.getElementById("year");


    if (year) {

      year.textContent =
        new Date().getFullYear();

    }


    setCategory("Breakfast");

    updateCartCount();

    renderCart();

  }
);