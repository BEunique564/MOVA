// AOS E-commerce Website JavaScript
// Product data and shopping cart functionality

// Products database
const products = [
  {
    id: 1,
    name: "AOS Organic Face Pack - 100G",
    description:
      "Premium organic face pack with natural ingredients for deep cleansing and hydration. Perfect for weekly skincare routine.",
    price: 199,
    image: "FACE PACK.png",
    sizes: ["100G"],
    category: "face-pack",
    ingredients: [
      "Rose Extract",
      "Turmeric",
      "Neem",
      "Aloe Vera",
      "Sandalwood",
    ],
    benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
  },
  {
    id: 2,
    name: "AOS Organic Face Pack - 50G",
    description:
      "Mid-size premium organic face pack perfect for regular use. Natural ingredients for healthy, glowing skin.",
    price: 99,
    image: "FACE PACK.png",
    sizes: ["50G"],
    category: "face-pack",
    ingredients: [
      "Rose Extract",
      "Turmeric",
      "Neem",
      "Aloe Vera",
      "Sandalwood",
    ],
    benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
  },
  {
    id: 3,
    name: "AOS Organic Face Pack - 30G",
    description:
      "Travel-friendly size organic face pack. Perfect for maintaining your skincare routine on the go.",
    price: 149,
    image: "FACE PACK.png",
    sizes: ["30G"],
    category: "face-pack",
    ingredients: [
      "Rose Extract",
      "Turmeric",
      "Neem",
      "Aloe Vera",
      "Sandalwood",
    ],
    benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
  },
  {
    id: 4,
    name: "AOS Organic Face Pack - 20G",
    description:
      "Trial size organic face pack. Perfect for first-time users to experience the AOS difference.",
    price: 119,
    image: "FACE PACK.png",
    sizes: ["20G"],
    category: "face-pack",
    ingredients: [
      "Rose Extract",
      "Turmeric",
      "Neem",
      "Aloe Vera",
      "Sandalwood",
    ],
    benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
  },
  {
    id: 5,
    name: "AOS Organic Face Scrub",
    description:
      "100% natural face scrub with no side effects. Gentle exfoliation for smooth, radiant skin. 4 oz premium tube.",
    price: 299,
    image: "single dry.png",
    sizes: ["120g"],
    category: "scrub",
    ingredients: [
      "Coffee Grounds",
      "Coconut Oil",
      "Brown Sugar",
      "Vitamin E",
      "Essential Oils",
    ],
    benefits: [
      "Gentle Exfoliation",
      "Removes Dead Skin",
      "Improves Texture",
      "Natural Radiance",
    ],
  },
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  updateCartCount();
  setupEventListeners();
  setupModalHandlers();
});

// Load and display products
function loadProducts() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create product card HTML
function createProductCard(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-card";

  const imgSrc = encodeURI("images/" + product.image);
  const fallback = "description.png";

  productDiv.innerHTML = `
<img src="${imgSrc}" alt="₹{product.name}" class="product-image" 
             onerror="this.onerror=null;this.src='${fallback}'">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-details">
            <div class="ingredients">
                <strong>Key Ingredients:</strong> ${product.ingredients.join(
                  ", "
                )}
            </div>
            <div class="benefits">
                <strong>Benefits:</strong> ${product.benefits.join(", ")}
            </div>
        </div>
        <div class="product-price">₹${product.price}</div>
        <div class="product-actions">
            <select class="size-selector" id="size-${product.id}">
                ${product.sizes
                  .map((size) => `<option value="${size}">${size}</option>`)
                  .join("")}
            </select>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;

  return productDiv;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const sizeSelector = document.getElementById(`size-${productId}`);
  const selectedSize = sizeSelector ? sizeSelector.value : product.sizes[0];

  if (!product) return;

  const existingItem = cart.find(
    (item) => item.id === productId && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.image,
    });
  }

  updateCartCount();
  saveCart();
  showNotification(`${product.name} added to cart!`);
}

// Update cart count display
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show cart modal
function showCart() {
  const modal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!modal || !cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div>
                    <h4>${item.name} (${item.size})</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                    <button onclick="removeFromCart(${item.id}, '${item.size}')" 
                            style="margin-left: 10px; background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px;">
                        Remove
                    </button>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });
  }

  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }

  modal.style.display = "block";
}

// Update item quantity in cart
function updateQuantity(productId, size, change) {
  const item = cart.find((item) => item.id === productId && item.size === size);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId, size);
    return;
  }

  updateCartCount();
  saveCart();
  showCart(); // Refresh cart display
}

// Remove item from cart
function removeFromCart(productId, size) {
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  updateCartCount();
  saveCart();
  showCart(); // Refresh cart display
}

// Proceed to checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.getElementById("cart-modal").style.display = "none";
  showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!modal || !checkoutItems) return;

  checkoutItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const checkoutItem = document.createElement("div");
    checkoutItem.style.cssText =
      "display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;";
    checkoutItem.innerHTML = `
            <span>${item.name} (${item.size}) x ${item.quantity}</span>
            <span>₹${itemTotal.toFixed(2)}</span>
        `;
    checkoutItems.appendChild(checkoutItem);
  });

  // Add shipping and tax
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  // Add shipping and tax display
  const shippingDiv = document.createElement("div");
  shippingDiv.style.cssText =
    "display: flex; justify-content: space-between; padding: 0.5rem 0;";
  shippingDiv.innerHTML = `<span>Shipping:</span><span>₹${shipping.toFixed(
    2
  )}</span>`;
  checkoutItems.appendChild(shippingDiv);

  const taxDiv = document.createElement("div");
  taxDiv.style.cssText =
    "display: flex; justify-content: space-between; padding: 0.5rem 0;";
  taxDiv.innerHTML = `<span>Tax:</span><span>₹${tax.toFixed(2)}</span>`;
  checkoutItems.appendChild(taxDiv);

  if (checkoutTotal) {
    checkoutTotal.textContent = finalTotal.toFixed(2);
  }

  modal.style.display = "block";
}

// Process order
function processOrder(orderData) {
  // Simulate API call to process payment and create order
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      const isSuccessful = Math.random() > 0.1; // 90% success rate

      if (isSuccessful) {
        const orderNumber = "AOS-" + Date.now();
        resolve({
          success: true,
          orderNumber: orderNumber,
          message: "Order placed successfully!",
        });
      } else {
        reject({
          success: false,
          message: "Payment failed. Please try again.",
        });
      }
    }, 2000);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Cart icon click
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      showCart();
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Checkout form submission
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutForm);
  }
}

// Setup modal handlers
function setupModalHandlers() {
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  // Close modal when clicking close button
  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  // Simulate sending contact form
  showNotification("Message sent successfully! We will get back to you soon.");
  e.target.reset();
}

// Handle checkout form submission
async function handleCheckoutForm(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector(".place-order-btn");
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = '<span class="loading"></span> Processing...';
  submitBtn.disabled = true;

  const formData = new FormData(e.target);
  const orderData = {
    customer: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      zipCode: formData.get("zipCode"),
    },
    payment: {
      cardNumber: formData.get("cardNumber"),
      expiryDate: formData.get("expiryDate"),
      cvv: formData.get("cvv"),
      cardName: formData.get("cardName"),
    },
    items: cart,
    total: calculateTotal(),
  };

  try {
    const result = await processOrder(orderData);

    if (result.success) {
      // Clear cart
      cart = [];
      updateCartCount();
      saveCart();

      // Close modal
      document.getElementById("checkout-modal").style.display = "none";

      // Show success message
      showOrderSuccess(result.orderNumber);
    }
  } catch (error) {
    showNotification(error.message, "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Calculate total including shipping and tax
function calculateTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  return subtotal + shipping + tax;
}

// Show order success message
function showOrderSuccess(orderNumber) {
  const successHtml = `
        <div class="success-message" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
             background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
             z-index: 3000; text-align: center; max-width: 400px;">
            <h3 style="color: var(--primary-gold); margin-bottom: 1rem;">Order Placed Successfully!</h3>
            <p style="margin-bottom: 1rem;">Order Number: <strong>${orderNumber}</strong></p>
            <p style="margin-bottom: 1.5rem;">Thank you for your purchase! You will receive an email confirmation shortly.</p>
            <button onclick="this.parentElement.remove()" 
                    style="background: var(--primary-gold); color: white; border: none; padding: 0.8rem 1.5rem; 
                           border-radius: 8px; cursor: pointer; font-weight: 600;">
                Continue Shopping
            </button>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", successHtml);
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className =
    type === "success" ? "success-message" : "error-message";
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        max-width: 300px;
        padding: 1rem;
        border-radius: 8px;
        font-weight: 500;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Smooth scroll to products section
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Format card number input
function formatCardNumber(input) {
  let value = input.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
  let formattedInputValue = value.match(/.{1,4}/g)?.join(" ");
  input.value = formattedInputValue || value;
}

// Validate form inputs
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9]?[0-9]{7,15}$/;
  return re.test(phone.replace(/\s/g, ""));
}

// Database simulation for order storage
class OrderDatabase {
  static orders = JSON.parse(localStorage.getItem("orders")) || [];

  static addOrder(orderData) {
    const order = {
      id: Date.now(),
      ...orderData,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    localStorage.setItem("orders", JSON.stringify(this.orders));
    return order;
  }

  static getOrders() {
    return this.orders;
  }

  static getOrderById(id) {
    return this.orders.find((order) => order.id === id);
  }
}

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    products,
    addToCart,
    updateQuantity,
    removeFromCart,
    calculateTotal,
    validateEmail,
    validatePhone,
    OrderDatabase,
  };
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("AOS E-commerce website loaded successfully!");

  // Add card number formatting
  const cardNumberInput = document.querySelector('input[name="cardNumber"]');
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      formatCardNumber(this);
    });
  }

  // Add expiry date formatting
  const expiryInput = document.querySelector('input[name="expiryDate"]');
  if (expiryInput) {
    expiryInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      this.value = value;
    });
  }
});

