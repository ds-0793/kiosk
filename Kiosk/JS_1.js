//언어가 영어인 음식 메뉴입니다. 관리를 쉽게 하기 위해 HTML 대신 자바스크립트에 적었습니다.
const menu = {
  분식: [
    { name: 'Tteokbokki', price: 3500, image: '떡볶이.jpg' },
    { name: 'Kimbap', price: 3000, image: '김밥.png' },
    { name: 'Sundae', price: 3500, image: '순대.png' },
    { name: 'Ramen', price: 4000, image: '라면.png' },
    { name: 'Fish Cake', price: 1500, image: '오뎅.png' },
    { name: 'Jjolmyeon', price: 4500, image: '쫄면.png' },
  ],
  음료: [
    { name: 'cola', price: 1500, image: '콜라.png' },
    { name: 'cider', price: 1500, image: '사이다.png' },
    { name: 'Fanta', price: 1500, image: '환타.png' }
  ]
};

//웹페이지를 렌더링할때 분식 카테코리의 음식 메뉴가 표시됩니다.
let currentCategory = '분식';
const cart = [];

function renderingMenu() {
  //id='menu'를 변수에 저장합니다.
  const grid = document.getElementById('menu_2');
  //음식 카테고리가 전환될때 이전의 메뉴들을 제거하여, 이전 메뉴가 뜨지 않게 합니다.
  grid.innerHTML = '';
  //현재 선택된 음식 카테고리에 해당하는 항목들을 하나씩 꺼내고, 각 항목에 대해 반복적으로 코드를 실행하게 합니다.
  menu[currentCategory].forEach(item => {
    //새로운 div를 생성하고 클래스 이름을  'menu-item'으로 정합니다.
    const div = document.createElement('div');
    div.className = 'menu-item';
    //항목의 이미지, 이름, 가격을 포함하는 HTML를 div안에 넣습니다.
    div.innerHTML = `<img src="${item.image}" alt="${item.name}" />
      <div>${item.name}<br><strong>${item.price.toLocaleString()}KRW</strong></div>
    `;
    //메뉴 항목을 클릭하면 add 함수 호출해 해당 항목들이 주문 내역에 추가되게 합니다.
    div.onclick = () => add(item.name, item.price, item.image);
    grid.appendChild(div);
  });
}

//음식 카테고리를 변경합니다.
function changeCategory(category) {
  currentCategory = category;
  //tab 클래스를 가진 요소들을 모두 선택한 뒤, 각각을 버튼 역할로 간주하고 반복문을 통해 특정 작업을 수행합니다. 
  document.querySelectorAll('.tab').forEach(btn => {
    //버튼의 텍스트가 현재 선택된 카테고리와 같으면 'active'를 추가하고, 아니면 제거함으로써 현재 선택한 카테고리를 표시합니다.
    btn.classList.toggle('active', btn.textContent === category);
  });
  renderingMenu();
}

function renderingCart() {
  const cartList = document.getElementById('cart');
  const total_1 = document.getElementById('total');
  //주문 내역을 초기화합니다.
  cartList.innerHTML = '';
  //총합 금액을 0으로 정합니다.
  let total = 0;
  //주문내역 안에 있는 각 항목을 반복문을 통해 특정 작업을 수행합니다.
  cart.forEach(item => {
    //각 항목의 가격과 수량을 곱해서 총액에 더합니다.
    total += item.price * item.quantity;
    //li 요소를 새로 만듭니다.
    const li = document.createElement('li');
    //그 li에 들어갈 항목 이미지, 이름, 가격 그리고 수량 조절 버튼을 추가합니다.
    li.innerHTML = `<img src="${item.image}" alt="${item.name}" />
      <span>${item.name} (${item.price.toLocaleString()}KRW)</span>
      <span class="quantity-controls">
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        ${item.quantity}
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
      </span>
    `;
    cartList.appendChild(li);
  });
  //총 금액을 표시합니다.
  total_1.textContent = total.toLocaleString();
}

//항목을 주문 내역에 추가합니다.
function add(name, price, image) {
  //추가했을때 주문 내역에 같은게 있는지에 따라 다르게 작동합니다.
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }
  renderingCart();
}

//주문 내역에 있는 항목의 수량을 변경합니다.
function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += delta;
  //주문내역에 수량이 0이 되면 그 음식 항목을 제거합니다.
  if (item.quantity <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  }
  renderingCart();
}

//전체삭제 기능입니다.
function cleanCart() {
  //배열의 길이를 0으로 설정함으로써 주문 내역을 초기화시킵니다.
  cart.length = 0;
  renderingCart();
}

function noOrder() {
  if (cart.length === 0) {
    alert("주문할 항목이 없습니다.");
    return;
  }
  const items = cart.map(item => `${item.name}(${item.quantity})`).join(", ");
  const Url = "index.html";
  window.location.href = Url;
}

//타이머 기능입니다.
let Time = 300;

function Timer() {
  const TimerElement = document.getElementById("timer");
  TimerElement.textContent = `Remaining time: ${Time}seconds`;
  if (Time <= 0) {
    window.location.href = "Main2.html"; 
  }
  //타이머 시간을 1씩 감소시킵니다.
  Time--;
}

function resetTimer() {
  Time = 300;
}

//마우스를 움직였거나 클릭했을때 타이머 시간이 초기화됩니다.
document.addEventListener("mousemove", resetTimer);
document.addEventListener("click", resetTimer);
//1초씩 감소하게 합니다.
setInterval(Timer, 1000);

//이 함수를 실행합니다.
renderingMenu();

function noOrder() {
  // 결제 모달 띄우기
  document.getElementById("paymentModal").style.display = "flex";

  // 장바구니 정보 가져오기
  const cartItems = document.querySelectorAll("#cart li");
  const total = document.getElementById("total").textContent;

  let itemListHTML = "<ul>";
  cartItems.forEach(item => {
    itemListHTML += `<li>${item.textContent}</li>`;
  });
  itemListHTML += "</ul>";
  itemListHTML += `<p><strong>total money: ${total}KRW</strong></p>`;

  document.getElementById("paymentItems").innerHTML = itemListHTML;
}
function closePaymentModal() {
  document.getElementById("paymentModal").style.display = "none";
}

function confirmPayment(method) {
  alert(`${method} Payment completed!`);
  cleanCart();
  closePaymentModal();
  location.href = "Main.html";
}