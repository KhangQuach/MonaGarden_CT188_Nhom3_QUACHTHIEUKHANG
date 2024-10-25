//Fetch data and store it in these two arrays

let plants = [];
let tools = [];
let users = [];
async function fetchData() {
    const response = await fetch('./data.json');

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const res = await response.json();

    res.plants.map((plant) => {
        plants.push(plant);
    })
    res.tools.map((tool) => {
        tools.push(tool);
    })
    res.users.map((user) => {
        users.push(user);
    })
}
await fetchData();

if (!localStorage.getItem("stock")) {
    let plantStock = [];
    plants.map((plant) => {
        plantStock.push({ "name": plant.name, "sold": 0 });
    })
    tools.map((tool) => {
        plantStock.push({ "name": tool.name, "sold": 0 });
    })
    localStorage.setItem("stock", JSON.stringify(plantStock));
}
console.log(localStorage);
localStorage.setItem("users", JSON.stringify(users));
// fetchData().catch(error => {
//     error.message; // 'An error has occurred: 404'
// });

function popUpMessages(message) {
    let messageElement = document.getElementById("message_content");
    messageElement.className = "display_message";
    messageElement.innerHTML = message;
    console.log(messageElement);
    setTimeout(function () { messageElement.className = messageElement.className.replace("display_message", ""); }, 3000);
}

let stock = JSON.parse(localStorage.getItem("stock"));
let addPlantToCart = (id, count) => {
    let items = [];
    let cartInput = document.getElementsByClassName("rangeforCart");
    cartInput[count].max = 100 - stock[id - 1].sold;
    let cartButton = document.getElementsByClassName("shoppingCartButton");
    cartButton[count].addEventListener("click", () => {
        if (localStorage.getItem('items')) {
            items = JSON.parse(localStorage.getItem('items'));
        } else {
            items.push({ "image": plants[id - 1].image, "name": plants[id - 1].name, "id": plants[id - 1].id, "price": plants[id - 1].price, "number": parseInt(cartInput[count].value) })
        }
        let isExist = false;
        for (let j = 0; j < items.length; j++) {
            if (plants[id - 1].name === items[j].name) {
                if (parseInt(cartInput[count].value) + items[j].number > parseInt(cartInput[count].max)) {
                    items[j].number = parseInt(cartInput[count].max);
                    popUpMessages("Số lượng đặt hàng vượt quá kho hàng đang có, số lượng sẽ tự động chuyển thành tối đa.");
                } else {
                    items[j].number += parseInt(cartInput[count].value);
                    popUpMessages("Đã thêm " + cartInput[count].value + " " + plants[id - 1].name + " vào giỏ hàng.");
                }
                isExist = true;
            }
        }
        if (!isExist) {
            if (parseInt(cartInput[count].value) > parseInt(cartInput[count].max)) {
                items.push({ "image": plants[id - 1].image, "name": plants[id - 1].name, "id": plants[id - 1].id, "price": plants[id - 1].price, "number": parseInt(cartInput[count].max) })
                popUpMessages("Số lượng đặt hàng vượt quá kho hàng đang có, số lượng sẽ tự động chuyển thành tối đa.");
            } else {
                items.push({ "image": plants[id - 1].image, "name": plants[id - 1].name, "id": plants[id - 1].id, "price": plants[id - 1].price, "number": parseInt(cartInput[count].value) })
                popUpMessages("Đã thêm " + cartInput[count].value + " " + plants[id - 1].name + " vào giỏ hàng.");
            }
        }
        localStorage.setItem('items', JSON.stringify(items));
    })
}
let addToolToCart = (id, count) => {

    let items = [];
    let cartInput = document.getElementsByClassName("rangeforCart");
    cartInput[count].max = 100 - stock[id - 1].sold;
    let cartButton = document.getElementsByClassName("shoppingCartButton");
    cartButton[count].addEventListener("click", () => {
        if (localStorage.getItem('items')) {
            items = JSON.parse(localStorage.getItem('items'));
        } else {
            items.push({ "image": tools[id - 1].image, "name": tools[id - 1].name, "id": tools[id - 1].id, "price": tools[id - 1].price, "number": parseInt(cartInput[count].value) })
        }
        let isExist = false;
        for (let j = 0; j < items.length; j++) {
            if (tools[id - 1 - plants.length].name === items[j].name) {
                if (parseInt(cartInput[count].value) + items[j].number > parseInt(cartInput[count].max)) {
                    items[j].number = parseInt(cartInput[count].max);
                    popUpMessages("Số lượng đặt hàng vượt quá kho hàng đang có, số lượng sẽ tự động chuyển thành tối đa.");
                } else {
                    items[j].number += parseInt(cartInput[count].value);
                }
                isExist = true;
            }
        }
        if (!isExist) {
            if (parseInt(cartInput[count].value) > parseInt(cartInput[count].max)) {
                items.push({ "image": tools[id - 1 - plants.length].image, "name": tools[id - 1 - plants.length].name, "id": tools[id - 1 - plants.length].id, "price": tools[id - 1 - plants.length].price, "number": parseInt(cartInput[count].max) })
                popUpMessages("Số lượng đặt hàng vượt quá kho hàng đang có, số lượng sẽ tự động chuyển thành tối đa.");
            } else {
                items.push({ "image": tools[id - 1 - plants.length].image, "name": tools[id - 1 - plants.length].name, "id": tools[id - 1 - plants.length].id, "price": tools[id - 1 - plants.length].price, "number": parseInt(cartInput[count].value) })
                popUpMessages("Đã thêm " + cartInput[count].value + " " + tools[id - 1 - plants.length].name + " vào giỏ hàng.");
            }
        }
        localStorage.setItem('items', JSON.stringify(items));
    })
}

//Shopping-cart

let renderShoppingCart = () => {
    if (localStorage.getItem('items')) {
        let shoppingCart = document.getElementById("shopping-cart-body");
        let items = JSON.parse(localStorage.getItem('items'));
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            shoppingCart.innerHTML += `
                <tr class="innerShoppingCart">
                    <td>${i + 1}</td>
                    <td><img src=${items[i].image} /></td>
                    <td>
                        <p>${items[i].name}</p>
                        <p>Giá :${items[i].price}</p>
                        <p>Số lượng :${items[i].number}</p>
                    </td>
                    <td>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(items[i].number) * parseFloat(items[i].price))}</td>
                </tr>`
            totalPrice += (parseFloat(items[i].number) * parseFloat(items[i].price));
        }

        const removeBtn = document.querySelectorAll('#shopping-cart-body tr');
        removeBtn.forEach((item, i) => {
            const td = document.createElement('td');
            const btn = document.createElement("button");
            btn.className += " btn btn-primary";
            btn.textContent = "Xóa";
            btn.addEventListener("click", () => {
                items.splice(i, 1);
                localStorage.setItem('items', JSON.stringify(items));
                location.reload();
                console.log(items);
            });
            td.appendChild(btn);
            item.appendChild(td);
        })
        const temp = document.getElementById('totalPriceShoppingCart');
        let totalPriceE = document.getElementsByClassName('totalPrice');
        for (let i = 0; i < totalPriceE.length; i++) {
            totalPriceE[i].textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
        }
        const td1 = document.createElement('td');
        td1.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Thanh Toán
                        </button>`
        temp.appendChild(td1);
        function HandleOrderEvent() {
            document.getElementById("orderBtn").addEventListener("click", () => {
                if (localStorage.getItem("isAuthorized")) {
                    popUpMessages("Đặt hàng thành công");
                    let orderInformation = {
                        "items": items,
                        "address": document.getElementById("user_address").value,
                        "totalPrice": totalPrice,
                        "status": "processing",
                    }
                    localStorage.setItem(JSON.parse(localStorage.getItem("isAuthorized")).username, JSON.stringify(orderInformation));
                } else {
                    popUpMessages("You have to log in first.");
                }
            })
        }
        HandleOrderEvent();
    }
}

function removeItemButton(key, func) {
    if (document.getElementById("clearBtn")) {
        document.getElementById("clearBtn").addEventListener("click", () => {
            localStorage.removeItem(key);
            popUpMessages("Dọn dẹp thành công.");
            func();
        })
    }
}
//Admin feature
function getOrderList(status) {
    let orderList = [];
    if (localStorage) {
        Object.entries(localStorage).map((order) => {
            if (order[0] != "items" && order[0] != "users" && order[0] != "isAuthorized" &&
                order[0] != "stock" && JSON.parse(order[1]).status == status)
                orderList.push(order);
        })
        return orderList;
    } else {
        return [];
    }
}

//Item handling
const popUp = document.querySelector('.pop-up');
const reRenderCacLoaiCay = (arrCay, elementName) => {
    if (elementName) {
        elementName.innerHTML = "";
        for (let i = 0; i < arrCay.length; i++) {
            elementName.innerHTML += `<div class="plant_div">
            <img src="${arrCay[i].image}" />
            <input type="hidden" name="id" value="${arrCay[i].id}" >
            <p>${arrCay[i].name}</p>
            <p class="plant_remain" name="remain">Còn: ${plants[i].remain - stock[plants[i].id - 1].sold}</p>
            <p class="plant_price">${arrCay[i].price}đ</p> 
            </div>`;
        }
    }
};

/*------------------------------------------- All Web Pages is here -------------------------------------------*/
function postchiTiet() {
    let plantDivItems = document.getElementsByClassName("plant_div");
    console.log(plantDivItems)
    for (let i = 0; i < plantDivItems.length; i++) {
        plantDivItems[i].addEventListener("click", () => {
            location.href = `/chitietsanpham.html?id=${plantDivItems[i].children.id.value}&count=${i}`;
        })
    }
}

function showChiTiet() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = parseInt(value);
        });
    console.log(vars.id)
    let leftAsideDetail = document.getElementById("leftAsideDetail");
    leftAsideDetail.innerHTML = `<img src="${vars.id <= plants.length ? plants[vars.id - 1].image : tools[vars.id - 1 - plants.length].image}">`;
    let rightDetail = document.getElementById("rightContentDetail");
    rightDetail.innerHTML = `

        <div class="detailContainer">
            <p class="strongText">${vars.id <= plants.length ? plants[vars.id - 1].name : tools[vars.id - 1 - plants.length].name}</p>
            <h5 class="smallText">Đã bán${stock[vars.id - 1].sold}</h5>
            <p class="strongText">Giá:${vars.id <= plants.length ? plants[vars.id - 1].price : tools[vars.id - 1 - plants.length].price}</p>
            <h5 class=smallText>Đổi ý miễn phí 15 ngày · Hàng chính hãng 100% · Miễn phí vận chuyển</h5>
            <div class="SCcontainer " style="display:flex;position:static;">
                <input class="rangeforCart" type="number" value="1" min=1>
                <button class="shoppingCartButton"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    `
    if (vars.id <= plants.length)
        addPlantToCart(vars.id, 0);
    else {
        addToolToCart(vars.id, 0);
    }
}


function trangChu() {
    let cacloaicaycanh = document.getElementById("cacloaicaycanh");
    let stock = JSON.parse(localStorage.getItem("stock"));
    if (cacloaicaycanh) {
        for (let i = 0, count = 0; i < plants.length; i++) {
            if (plants[i].type != "cay") continue;
            if (count == 10) break;
            cacloaicaycanh.innerHTML +=
                `<span class="plant_div">
                    <img name="image" src="${plants[i].image}" />
                    <input type="hidden" name="id" value="${plants[i].id}" >
                    <p class="plant_name" name="name">${plants[i].name}</p>
                    <p class="plant_remain" name="remain">Còn: ${plants[i].remain - stock[plants[i].id - 1].sold}</p>
                    <p name="price" class="plant_price">${plants[i].price}đ</p>
                </span>`
            count++;
        }

    }
    if (cacloaihoa) {
        for (let i = 0, count = 10; i < plants.length; i++) {
            if (plants[i].type != "Hoa") continue;
            if (count == 20) break;
            cacloaihoa.innerHTML +=
                `<span class="plant_div">
                    <img name="image" src="${plants[i].image}" />
                    <input type="hidden" name="id" value="${plants[i].id}" >
                    <p class="plant_name" name="name">${plants[i].name}</p>
                    <p class="plant_remain">Còn: ${plants[i].remain - stock[plants[i].id - 1].sold}</p>
                    <p name="price" class="plant_price">${plants[i].price}đ</p>
                </span>`
            count++;
        }
        let cacloaiphukien = document.getElementById("cacloaiphukien");
        if (cacloaiphukien) {
            for (let i = 0, count = 20; i < tools.length; i++) {
                if (count == 25) break;
                cacloaiphukien.innerHTML +=
                    `<span class="plant_div">
                    <img src="${tools[i].image}" />
                    <input type="hidden" name="id" value="${tools[i].id}" >
                    <p class="plant_name">${tools[i].name}</p>
                    <p class="plant_price">${tools[i].price}đ</p>
                    <p class="plant_remain">Còn: ${tools[i].remain - stock[tools[i].id - 1].sold}</p>
                </span>`
            }
        }
    }
};
function cacLoaiCay() {
    const popUp = document.querySelector('.pop-up');
    let cacloaicay = document.getElementById("cacloaicay");
    let newPlantsTypeCay = plants.filter((plant) => {
        return plant.type === "cay";
    });
    reRenderCacLoaiCay(newPlantsTypeCay, cacloaicay);
    const priceRangeInput = document.querySelector(".price-range-input");
    const priceRange = document.querySelector(".price-range");

    let rangeTypeCay;
    priceRangeInput.onchange = () => {
        console.log(priceRangeInput.value);
        priceRange.textContent = `Giá: 50000 đ - ${priceRangeInput.value} đ`;
        rangeTypeCay = plants.filter((plant) => {
            return (
                plant.type === "cay" && +plant.price <= +priceRangeInput.value
            );
        });
        console.log(rangeTypeCay);
        reRenderCacLoaiCay(rangeTypeCay, cacloaicay);
    };
    const sortSelection = document.querySelector(".selection");
    const tempPriceRangeInput = priceRangeInput.value;
    console.log(tempPriceRangeInput);
    sortSelection.onchange = () => {
        switch (sortSelection.value) {
            case "0":
                reRenderCacLoaiCay(newPlantsTypeCay, cacloaicay);
                break;

            case "1":
                let incPrice;
                if (priceRangeInput.value === tempPriceRangeInput) {
                    incPrice = newPlantsTypeCay.sort((a, b) => {
                        return a.price - b.price;
                    });
                    reRenderCacLoaiCay(incPrice, cacloaicay);
                } else {
                    rangeTypeCay.sort((a, b) => {
                        return a.price - b.price;
                    });
                    reRenderCacLoaiCay(rangeTypeCay, cacloaicay);
                }
                break;

            case "2":
                let decsPrice;
                if (priceRangeInput.value === tempPriceRangeInput) {
                    decsPrice = newPlantsTypeCay.sort((a, b) => {
                        return b.price - a.price;
                    });
                    reRenderCacLoaiCay(newPlantsTypeCay, cacloaicay);
                } else {
                    rangeTypeCay.sort((a, b) => {
                        return b.price - a.price;
                    });
                    reRenderCacLoaiCay(rangeTypeCay, cacloaicay);
                }
                break;
        }
    }
    //Pop up Item
    const closePlantsZoom = document.querySelector('.close');
    closePlantsZoom.addEventListener("click", () => {
        popUp.style.display = 'none';
    });
};

function cacLoaiHoa() {

};
function cacLoaiCayGiong() {

};
function phuKien() {
};

function dangNhap() {

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    if (registerBtn) {
        registerBtn.addEventListener('click', function () {
            container.classList.add("active");
        });
    }
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }
    function signUpEvent() {
        const signUpForm = document.getElementById("sign_up_form");
        const signUpBtn = document.getElementById("sign_up_button");
        let usersInLocalStorage = [];
        if (localStorage.getItem("users")) {
            usersInLocalStorage = JSON.parse(localStorage.getItem("users").split(","));
        }
        signUpBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (signUpForm.checkValidity()) {
                let isExisted = false;
                users.map((user) => {
                    if (user.username == signUpForm.username.value || user.email == signUpForm.email.value) {
                        isExisted = true;
                    }
                })
                usersInLocalStorage.map((user) => {
                    if (user.username == signUpForm.username.value || user.email == signUpForm.email.value) {
                        isExisted = true;
                    }
                })

                if (isExisted) {
                    popUpMessages("Tài khoản đã tồn tại.");
                } else {
                    usersInLocalStorage.push({ 'username': signUpForm.username.value, 'password': signUpForm.password.value, 'email': signUpForm.email.value, 'type': "user" });
                    localStorage.setItem("users", JSON.stringify(usersInLocalStorage));
                    popUpMessages("Tạo tài khoản thành công.");
                    setTimeout(() => location.reload(), 500);
                }
            } else {
                popUpMessages("Định dạng tài khoản hoặc mật khẩu sai.");
            }

        })
    }
    signUpEvent();

    function signInEvent() {
        const signInForm = document.getElementById("sign_in_form");
        const signInButton = document.getElementById("sign_in_button");
        let usersInLocalStorage = [];
        if (localStorage.getItem("users")) {
            usersInLocalStorage = JSON.parse(localStorage.getItem("users").split(","));
        }
        signInButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (signInForm.checkValidity()) {
                let isAuthorized = false;
                let keyUser = {};
                usersInLocalStorage.map((user) => {
                    if (user.email == signInForm.email.value) {
                        if (user.password == signInForm.password.value) {
                            isAuthorized = true;
                            keyUser = user;
                        }
                    }
                })
                users.map((user) => {
                    if (user.email == signInForm.email.value) {
                        if (user.password == signInForm.password.value) {
                            isAuthorized = true;
                            keyUser = user;
                        }
                    }
                })
                if (isAuthorized) {
                    popUpMessages("Xin chào " + keyUser.username);
                    localStorage.setItem("isAuthorized", JSON.stringify(keyUser));
                    location.reload();
                } else {
                    popUpMessages("Log in fail.");
                }
            }
        })
    }
    signInEvent();
}

function trangAdmin() {
    const logOutButton = document.getElementById("log_out_button");
    logOutButton.addEventListener("click", () => {
        localStorage.removeItem("isAuthorized");
        location.href = "/dangnhap.html";
    });

    function renderAdminMainPage() {
        let trangChinh = `
            <div class="d-flex">
                <div class="adminItemCustom">
                    <p>${JSON.parse(localStorage.getItem("users")).length}</p>
                    <p>Tài khoản</p>
                </div>
                <div class="adminItemCustom">
                    <p>${getOrderList("processing").length}</p>
                    <p>Đơn hàng chưa xử lí</p>
                </div>
                <div class="adminItemCustom">
                    <p>${JSON.parse(localStorage.getItem("totalPrice")) | 0}$</p>
                    <p>Doanh thu</p>
                </div>
            </div>`
        document.getElementById("content_side").innerHTML = trangChinh;
    }

    function renderDetailExchange() {
        let processingOrder = getOrderList("processing");
        let processingOrderString = "";
        processingOrder.map((order) => {
            let data = JSON.parse(order[1]);
            processingOrderString += `
            <div class="card cardCustom">
                <ul class="list-group list-group-flush">
                    <li class="card-header fw-bold text-center">Người đặt ${order[0]}</li>`
            data.items.map((item) => {
                processingOrderString += `
                            <li class="list-group-item">${item.name} x ${item.number} (Còn ${100 - stock[item.id - 1].sold})</li>`
            })
            processingOrderString += `
                    <li class="list-group-item">Tổng tiền: ${data.totalPrice}vnđ</li>
                    <li class="list-group-item">Địa chỉ: ${data.address}</li>
                    <li class="list-group-item">
                        <button class="btn btn-primary acceptOrderButton">Chấp nhận đơn hàng</button>
                        <button class="btn btn-primary deleteOrder">Hủy đơn hàng</button>
                    </li>
                </ul>
            </div>`
        })
        let acceptedOrderString = "";
        if (localStorage.getItem("acceptedOrderList")) {
            let acceptedOrder = JSON.parse(localStorage.getItem("acceptedOrderList"));
            acceptedOrder.map((orders) => {
                acceptedOrderString += `
                <div class="card cardCustom">
                    <ul class="list-group list-group-flush">
                        <li class="card-header fw-bold text-center">Người đặt ${orders.name}</li>`
                orders.data.items.map((item) => {
                    acceptedOrderString += `
                                <li class="list-group-item">${item.name} x ${item.number} </li>`
                })
                acceptedOrderString += `
                        <li class="list-group-item">Tổng tiền: ${orders.data.totalPrice}đ</li>
                        <li class="list-group-item">Thời gian: ${orders.data.date}</li>
                    </ul>
                </div>`
            })
        }


        let giaoDich = `
        <div>
            <h1>Đơn hàng chưa xử lý</h1>
            <div>
                ${processingOrderString}
            </div>
            <h1>Lịch Sử Giao Dịch </h1>
            ${acceptedOrderString && `<button class="btn btn-primary class="btn btn-primary" id="clearBtn">Dọn dẹp</button>`}
            ${acceptedOrderString}
        </div>`
        document.getElementById("content_side").innerHTML = giaoDich;
        //Render buttons after class acceptOrderButton is avaliable
        if (localStorage.getItem("acceptedOrderList")) {
            removeItemButton("acceptedOrderList", renderDetailExchange);
        }
        if (document.getElementsByClassName("acceptOrderButton")) {
            let acceptOrderButtons = document.getElementsByClassName("acceptOrderButton");
            let deleteOrderButtons = document.getElementsByClassName("deleteOrder");
            for (let i = 0; i < acceptOrderButtons.length; i++) {
                acceptOrderButtons[i].addEventListener("click", () => {
                    let data = JSON.parse(processingOrder[i][1]);
                    data.status = "Accepted.";
                    data.date = (new Date()).toISOString();
                    let acceptedOrderList = [];
                    if (localStorage.getItem("acceptedOrderList")) {
                        acceptedOrderList = JSON.parse(localStorage.getItem("acceptedOrderList"));
                    }
                    acceptedOrderList.push({ "name": processingOrder[i][0], "data": data });
                    localStorage.setItem("acceptedOrderList", JSON.stringify(acceptedOrderList));
                    localStorage.setItem(processingOrder[i][0], JSON.stringify(data));
                    localStorage.setItem("totalPrice", JSON.parse(localStorage.getItem("totalPrice") | 0) + parseFloat(data.totalPrice) / 25445);
                    let isOutOfStock = false;
                    data.items.map((item) => {
                        if (item.number + stock[item.id - 1].sold > 100) {
                            isOutOfStock = true;
                            console.log(item.name + " chỉ còn " + (100 - stock[item.id - 1].sold) + " sản phẩm");
                        }
                    })
                    if (!isOutOfStock) {
                        data.items.map((item) => {
                            stock[item.id - 1].sold += item.number;
                        })
                        console.log(stock);
                    }
                    localStorage.setItem("stock", JSON.stringify(stock));
                    popUpMessages("Giao dịch thành công");
                    renderDetailExchange();
                })
                deleteOrderButtons[i].addEventListener("click", () => {
                    localStorage.removeItem(processingOrder[i][0]);
                    renderDetailExchange();
                    popUpMessages("Hủy thành công");
                })
            }
        }
    }

    const usersList = JSON.parse(localStorage.getItem("users"));
    function renderUsersList() {
        let usersListString = "";
        usersList.map((user) => {
            usersListString += `<tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button class="btn btn-primary deleteAccountBtn">Xóa</button>
                    <button type="button" class="btn btn-primary changePwBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Đổi mật khẩu
                    </button>
                </td>
            </tr>`
        })
        let taiKhoan = `
            <div>
                <h1>Quản Lý Tài Khoản</h1>
                <table id="quanLyTaiKhoanAdmin">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operation</th>
                        </tr>
                        ${usersListString}
                </table>
            </div>
            <!-- Bootstrap modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Đổi mật khẩu</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="newPw">Mật khẩu mới:</label>
                            <input id="newPw" type="text" placeholder="Nhập mật khẩu mới">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" id="saveChangeBtn">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.getElementById("content_side").innerHTML = taiKhoan;
    }
    function addDeleteEvent() {
        let accounts = document.querySelectorAll('.deleteAccountBtn');
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].addEventListener("click", () => {
                usersList.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(usersList));
                popUpMessages("Đã xóa tài khoản thành công");
                renderUsersList();
                addDeleteEvent();
            })
        }
    }
    function addChangePasswordEvent() {
        const changePwBtns = document.querySelectorAll(".changePwBtn");
        for (let i = 0; i < changePwBtns.length; i++) {
            changePwBtns[i].addEventListener("click", () => {
                const saveChangeBtn = document.getElementById("saveChangeBtn");
                function setNewPw() {
                    const newPw = document.getElementById("newPw");
                    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(newPw.value)) {
                        usersList[i].password = newPw.value;
                        localStorage.setItem("users", JSON.stringify(usersList));
                        popUpMessages("Đã thay đổi mật khẩu");
                    } else if (usersList[i].password == newPw.value) {
                        popUpMessages("Mật khẩu mới phải khác mật khẩu cũ");
                    } else {
                        popUpMessages("Mật khẩu mới phải bao gồm 1 ký tự in hoa, 1 chữ số và độ dài 8 ký tự");
                    }
                    saveChangeBtn.removeEventListener("click", setNewPw);
                }
                saveChangeBtn.addEventListener("click", setNewPw)
            })
        }
    }
    function renderProductsDetail() {
        let stock = JSON.parse(localStorage.getItem("stock"));
        let productDetailCards = "";
        plants.map((plant, i) => {
            productDetailCards +=
                `<div class="card adminProductCardCustom" style="width: 33%;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${plant.name}</li>
                        <li class="list-group-item">${plant.price}đ</li>
                        <li class="list-group-item" >Còn lại: ${plant.remain - stock[i].sold}</li>
                    </ul>

                </div>`
        })
        tools.map((tool, i) => {
            productDetailCards +=
                `<div class="card adminProductCardCustom" style="width: 33%;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${tool.name}</li>
                        <li class="list-group-item">${tool.price}đ</li>
                        <li class="list-group-item" >Còn lại: ${tool.remain - stock[i + plants.length].sold}</li>
                    </ul>

                </div>`
        })
        let sanPham = `
        <div>
            <h1>Sản phẩm</h1>
            <div class="d-inline-flex p-2 bd-highlight flex-wrap">
                ${productDetailCards}
            </div>
        </div>`
        document.getElementById("content_side").innerHTML = sanPham;
    }
    //Load Main Page when reload page
    renderAdminMainPage();

    document.getElementById("trang_chinh").addEventListener("click", () => {
        renderAdminMainPage();
    })
    document.getElementById("giao_dich").addEventListener("click", () => {
        renderDetailExchange();
    })
    document.getElementById("tai_khoan").addEventListener("click", () => {
        renderUsersList();
        addDeleteEvent();
        addChangePasswordEvent();
    })

    document.getElementById("san_pham").addEventListener("click", () => {
        renderProductsDetail();
    })
}

function trangCaNhan() {
    function showOrderHistory() {
        const userOrderHistory = document.getElementById("userOrderHistory");
        if (localStorage.getItem(JSON.parse(localStorage.getItem("isAuthorized")).username)) {
            let ordersHistory = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("isAuthorized")).username));
            let userOrderHistoryString = "";
            userOrderHistoryString += `
                <table class="table table-striped table-hover fs-3">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Thành tiền</th>
                            <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                `
            let totalPrice = 0;
            ordersHistory.items.map((item, i) => {
                userOrderHistoryString += `
                    <tr>
                        <td scope="row">${i + 1}</td>
                        <td >${item.name}</td>
                        <td>${item.number}</td>
                        <td colspan=2>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(item.number) * parseFloat(item.price))}</td>
                    </tr>
                `
                totalPrice += (parseFloat(item.number) * parseFloat(item.price));
            })
            userOrderHistoryString += `
                <tr>
                    <td>Tổng tiền<td>
                    <td></td>
                    <td>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</td>
                    <td>${ordersHistory.status}</td>
                </tr>
            `;
            userOrderHistoryString += `</tbody>${ordersHistory.status == "Accepted." ? `<button class="btn btn-primary" id="clearBtn">Dọn dẹp</button>` : ""}</table>`;
            userOrderHistory.innerHTML = userOrderHistoryString;
            if (localStorage.getItem(JSON.parse(localStorage.getItem("isAuthorized")).username)) {
                removeItemButton(JSON.parse(localStorage.getItem("isAuthorized")).username, showOrderHistory);
            }
        } else {
            userOrderHistory.innerHTML = `<p class="fs-2 d-flex justify-content-center">Bạn chưa đặt hàng<p>`;
        }
    }
    showOrderHistory();

    function showUserDetail() {
        const userInfo = document.getElementById("userInfo");
        const user = JSON.parse(localStorage.getItem("isAuthorized"));
        userInfo.innerHTML = `
            <div class="card fs-3 mx-auto rounded-4" style="width: 50%;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Tên đăng nhập:  ${user.username}</li>
                    <li class="list-group-item">Email:  ${user.email}</li>
                    <li class="list-group-item">Mật khẩu:  ${user.password}</li>
                </ul>
            </div>
        `
    }
    showUserDetail();
    const logOutButton = document.getElementById("log_out_button");
    logOutButton.addEventListener("click", () => {
        localStorage.removeItem("isAuthorized");
        location.href = "/dangnhap.html";
    })
}

function gioHang() {
    renderShoppingCart();
};
const dataPath = location.pathname;
console.log(dataPath);
switch (dataPath) {
    case "/trangchu.html":
        trangChu();
        postchiTiet();
        break;
    case "/gioithieu.html":
        break;
    case "/cacloaicay.html":
        cacLoaiCay();
        postchiTiet();
        break;
    case "/cacloaihoa.html":
        cacLoaiHoa();
        postchiTiet();
        break;
    case "/cacloaicaygiong.html":
        cacLoaiCayGiong();
        break;
    case "/phukien.html":
        phuKien();
        break;
    case "/tintuc.html":
        break;
    case "/lienhe.html":
        break;
    case "/dangky.html":
        break;
    case "/dangnhap.html":
        if (localStorage.getItem("isAuthorized")) {
            if (JSON.parse(localStorage.getItem("isAuthorized")).type == "admin") {
                location.href = "/admin.html";
            } else if (JSON.parse(localStorage.getItem("isAuthorized")).type == "user") {
                location.href = "/trangcanhan.html";
            }
        }
        dangNhap();
        break;
    case "/giohang.html":
        gioHang();
        break;
    case "/admin.html":
        if (!localStorage.getItem("isAuthorized")) {
            location.href = "/dangnhap.html";
        }
        trangAdmin();
        break;
    case "/trangcanhan.html":
        if (!localStorage.getItem("isAuthorized")) {
            location.href = "/dangnhap.html";
        }
        trangCaNhan();
        break;
    case "/search.html":
        search();
    case "/chitietsanpham.html":
        showChiTiet();
        break;
}
//Search
function search() {
    const searchInput = document.querySelector('.search-input');
    const searchItems = document.querySelector('.items');
    console.log(searchInput);
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            const value = event.target.value;
            if (event.key === "Enter") {
                console.log(searchItems);
                console.log(event.target.value);
                let allItem = plants.concat(tools);
                allItem = allItem.filter((item, index) => {
                    return item.name.toLowerCase().trim().includes(value.trim().toLowerCase());
                })
                reRenderCacLoaiCay(allItem, searchItems);
                console.log(allItem);

            }
        });

    }
    console.log(search);
}