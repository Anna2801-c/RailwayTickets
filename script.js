// ===========================
// ДЕМO-ДАНІ (імітація БД)
// ===========================

// Станції
const stations = [
    { StationID: 1, StationName: "Харків-Пасажирський", City: "Харків" },
    { StationID: 2, StationName: "Київ-Пасажирський", City: "Київ" },
    { StationID: 3, StationName: "Львів", City: "Львів" },
    { StationID: 4, StationName: "Полтава-Київська", City: "Полтава" },
    { StationID: 5, StationName: "Тернопіль", City: "Тернопіль" }
];

// Пасажири
const passengers = [
    { PassengerID: 1, FullName: "Міла Бережко", PassportNumber: "КВ123456" },
    { PassengerID: 2, FullName: "Ігор Петренко", PassportNumber: "КХ654321" },
    { PassengerID: 3, FullName: "Анна Кравченко", PassportNumber: "АА111111" }
];

// Типи вагонів
const carTypes = [
    { CarTypeID: 1, CarTypeName: "Купе", ComfortLevel: "Комфорт" },
    { CarTypeID: 2, CarTypeName: "Плацкарт", ComfortLevel: "Стандарт" },
    { CarTypeID: 3, CarTypeName: "СВ", ComfortLevel: "Підвищений комфорт" },
    { CarTypeID: 4, CarTypeName: "Сидячий", ComfortLevel: "Інтерсіті" }
];

// Типи квитків
const ticketTypes = [
    { TicketTypeID: 1, TypeName: "Дорослий", RequiresSeat: true,  DiscountPercent: 0,   StudentDiscountPercent: 0 },
    { TicketTypeID: 2, TypeName: "Дитячий",  RequiresSeat: true,  DiscountPercent: 50,  StudentDiscountPercent: 0 },
    { TicketTypeID: 3, TypeName: "Студентський", RequiresSeat: true, DiscountPercent: 0, StudentDiscountPercent: 25 },
    { TicketTypeID: 4, TypeName: "Немовля без місця", RequiresSeat: false, DiscountPercent: 90, StudentDiscountPercent: 0 }
];

// Додаткові послуги
const services = [
    { ServiceID: 1, ServiceName: "Чай", ServicePrice: 30.00 },
    { ServiceID: 2, ServiceName: "Кава", ServicePrice: 35.00 },
    { ServiceID: 3, ServiceName: "Постіль", ServicePrice: 80.00 },
    { ServiceID: 4, ServiceName: "Страхування", ServicePrice: 50.00 },
    { ServiceID: 5, ServiceName: "Перевезення тварини", ServicePrice: 80.00 },
    { ServiceID: 6, ServiceName: "Великий багаж", ServicePrice: 60.00 }
];

// Поїзди
const trains = [
    { TrainID: 1, TrainNumber: "072П", TrainType: "Нічний швидкий", TrainCategory: "Міжміський" },
    { TrainID: 2, TrainNumber: "765І", TrainType: "Інтерсіті+", TrainCategory: "Міжміський" },
    { TrainID: 3, TrainNumber: "820К", TrainType: "Приміський", TrainCategory: "Приміський" }
];

// Маршрути (Trips + TripStops як один об'єкт)
const routes = [
    // Прямий Харків → Київ
    {
        RouteID: 1,
        Type: "direct", // Прямий
        TrainID: 1,
        FromStationID: 1,
        ToStationID: 2,
        DepartureDateTime: "2025-12-01T21:00:00",
        ArrivalDateTime:   "2025-12-02T06:00:00",
        BasePrice: 800.00,
        Stops: [
            { Order: 1, StationID: 4, ArrivalTime: "2025-12-01T23:00:00", DepartureTime: "2025-12-01T23:05:00" }
        ]
    },
    // Прямий Харків → Львів (через Полтаву, Київ, Тернопіль як проміжні)
    {
        RouteID: 2,
        Type: "direct",
        TrainID: 1,
        FromStationID: 1,
        ToStationID: 3,
        DepartureDateTime: "2025-12-02T20:00:00",
        ArrivalDateTime:   "2025-12-03T09:30:00",
        BasePrice: 1300.00,
        Stops: [
            { Order: 1, StationID: 4, ArrivalTime: "2025-12-02T22:00:00", DepartureTime: "2025-12-02T22:10:00" },
            { Order: 2, StationID: 2, ArrivalTime: "2025-12-03T01:30:00", DepartureTime: "2025-12-03T01:45:00" },
            { Order: 3, StationID: 5, ArrivalTime: "2025-12-03T06:30:00", DepartureTime: "2025-12-03T06:40:00" }
        ]
    },
    // Інтерсіті Харків → Київ
    {
        RouteID: 3,
        Type: "direct",
        TrainID: 2,
        FromStationID: 1,
        ToStationID: 2,
        DepartureDateTime: "2025-12-01T07:00:00",
        ArrivalDateTime:   "2025-12-01T11:10:00",
        BasePrice: 950.00,
        Stops: [
            { Order: 1, StationID: 4, ArrivalTime: "2025-12-01T09:10:00", DepartureTime: "2025-12-01T09:12:00" }
        ]
    },
    // Маршрут з пересадкою: Харків → Київ → Львів
    {
        RouteID: 4,
        Type: "transfer", // З пересадкою
        FromStationID: 1,
        ToStationID: 3,
        BasePrice: 1500.00,
        Legs: [
            {
                LegID: 1,
                TrainID: 2,
                FromStationID: 1,
                ToStationID: 2,
                DepartureDateTime: "2025-12-01T07:00:00",
                ArrivalDateTime:   "2025-12-01T11:10:00"
            },
            {
                LegID: 2,
                TrainID: 1,
                FromStationID: 2,
                ToStationID: 3,
                DepartureDateTime: "2025-12-01T23:00:00",
                ArrivalDateTime:   "2025-12-02T07:30:00"
            }
        ],
        Stops: [
            // Для прикладу – лише одна проміжна на другій ділянці
            { Order: 1, StationID: 5, ArrivalTime: "2025-12-02T04:00:00", DepartureTime: "2025-12-02T04:05:00" }
        ]
    }
];

// ===========================
// ГЛОБАЛЬНІ ЗМІННІ
// ===========================

let selectedRoute = null;

const orders = [];
const ticketsHistory = [];
let nextOrderID = 1;
let nextTicketID = 1;
let currentOrderId = null;

// ===========================
// ДОСТУП ДО DOM-ЕЛЕМЕНТІВ
// ===========================

// Пошук рейсів
const fromStationSelect   = document.getElementById("fromStation");
const toStationSelect     = document.getElementById("toStation");
const searchDateInput     = document.getElementById("searchDate");
const routeTypeSelect     = document.getElementById("routeTypeSelect");
const btnSearchRoutes     = document.getElementById("btnSearchRoutes");
const routesTableBody     = document.getElementById("routesTableBody");

// Оформлення
const orderFormSection    = document.getElementById("orderFormSection");
const selectedRouteInfo   = document.getElementById("selectedRouteInfo");
const passengerSelect     = document.getElementById("passengerSelect");
const ticketTypeSelect    = document.getElementById("ticketTypeSelect");
const carTypeSelect       = document.getElementById("carTypeSelect");
const seatNumberInput     = document.getElementById("seatNumber");
const carNumberInput      = document.getElementById("carNumber");
const withChildCheckbox   = document.getElementById("withChild");
const withAnimalCheckbox  = document.getElementById("withAnimal");
const withBaggageCheckbox = document.getElementById("withBaggage");
const servicesListDiv     = document.getElementById("servicesList");
const doubleCoupeCheckbox = document.getElementById("doubleCoupeCheckbox");
const paymentModeRadios   = document.querySelectorAll('input[name="paymentMode"]');
const paymentMethodSelect = document.getElementById("paymentMethod");
const btnCalcPrice        = document.getElementById("btnCalcPrice");
const btnConfirmOrder     = document.getElementById("btnConfirmOrder");
const calcPriceResult     = document.getElementById("calcPriceResult");

// Квиток
const ticketSection  = document.getElementById("ticketSection");
const ticketContent  = document.getElementById("ticketContent");
const btnPrintTicket = document.getElementById("btnPrintTicket");

// Журнал замовлень
const ordersLogSection   = document.getElementById("ordersLogSection");
const ordersDateFrom     = document.getElementById("ordersDateFrom");
const ordersDateTo       = document.getElementById("ordersDateTo");
const ordersPassengerSel = document.getElementById("ordersPassenger");
const btnShowOrders      = document.getElementById("btnShowOrders");
const ordersTableBody    = document.getElementById("ordersTableBody");

// Проміжні станції
const stopsPanel      = document.getElementById("stopsPanel");
const stopsTitle      = document.getElementById("stopsTitle");
const stopsTableBody  = document.getElementById("stopsTableBody");
const btnCloseStops   = document.getElementById("btnCloseStops");

// ===========================
// ДОПОМІЖНІ ФУНКЦІЇ
// ===========================

function stationNameById(id) {
    const s = stations.find(x => x.StationID === id);
    return s ? s.StationName : "(невідома станція)";
}

function trainById(id) {
    return trains.find(t => t.TrainID === id) || null;
}

function formatTime(dtStr) {
    const d = new Date(dtStr);
    if (isNaN(d)) return "-";
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
}

function formatDateTime(dtStr) {
    const d = new Date(dtStr);
    if (isNaN(d)) return "-";
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${dd}.${mm}.${yy} ${hh}:${mi}`;
}

function diffHoursMinutes(startStr, endStr) {
    const s = new Date(startStr);
    const e = new Date(endStr);
    if (isNaN(s) || isNaN(e)) return "-";
    const diffMs = e - s;
    const diffMin = Math.round(diffMs / 60000);
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return `${h} год ${m} хв`;
}

function buildRouteDescription(route) {
    if (!route) return "Маршрут не обрано";

    if (route.Type === "transfer" && route.Legs && route.Legs.length === 2) {
        const leg1 = route.Legs[0];
        const leg2 = route.Legs[1];
        return `${stationNameById(leg1.FromStationID)} — ${stationNameById(leg1.ToStationID)} — ${stationNameById(leg2.ToStationID)}`;
    }

    const fromName = stationNameById(route.FromStationID);
    const toName   = stationNameById(route.ToStationID);
    return `${fromName} — ${toName}`;
}

// Розрахунок ціни квитка (аналог функції CalculateTicketPrice)
function calculateTicketPrice() {
    if (!selectedRoute) return null;

    const ticketTypeId = parseInt(ticketTypeSelect.value);
    const ticketType   = ticketTypes.find(t => t.TicketTypeID === ticketTypeId);
    if (!ticketType) return null;

    let base = selectedRoute.BasePrice;

    // знижка за тип квитка
    base = base * (1 - ticketType.DiscountPercent / 100);

    // студентська знижка, якщо це студентський
    base = base * (1 - ticketType.StudentDiscountPercent / 100);

    // послуги
    let servicesSum = 0;

    const serviceCheckboxes = servicesListDiv.querySelectorAll('input[type="checkbox"]');
    serviceCheckboxes.forEach(ch => {
        if (ch.checked) {
            const serviceId = parseInt(ch.value);
            const srv = services.find(s => s.ServiceID === serviceId);
            if (srv) servicesSum += srv.ServicePrice;
        }
    });

    // додаткові галочки
    if (withAnimalCheckbox.checked) {
        servicesSum += 80; // аналог послуги "тварина"
    }
    if (withBaggageCheckbox.checked) {
        servicesSum += 60; // аналог "великий багаж"
    }

    let finalPrice = base + servicesSum;

    // Якщо купе на двох — вартість одного місця лишається така, але загальна сума ордера буде множитися
    return finalPrice;
}

// ===========================
// РЕНДЕРИНГ
// ===========================

function renderStationsSelects() {
    fromStationSelect.innerHTML = "";
    toStationSelect.innerHTML   = "";

    stations.forEach(st => {
        const opt1 = document.createElement("option");
        opt1.value = st.StationID;
        opt1.textContent = `${st.StationName} (${st.City})`;
        fromStationSelect.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = st.StationID;
        opt2.textContent = `${st.StationName} (${st.City})`;
        toStationSelect.appendChild(opt2);
    });

    fromStationSelect.value = "1"; // Харків
    toStationSelect.value   = "2"; // Київ
}

function renderPassengers() {
    passengerSelect.innerHTML = "";
    ordersPassengerSel.innerHTML = `<option value="">Усі пасажири</option>`;

    passengers.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.PassengerID;
        opt.textContent = p.FullName;
        passengerSelect.appendChild(opt);

        const opt2 = document.createElement("option");
        opt2.value = p.PassengerID;
        opt2.textContent = p.FullName;
        ordersPassengerSel.appendChild(opt2);
    });
}

function renderTicketTypes() {
    ticketTypeSelect.innerHTML = "";
    ticketTypes.forEach(tt => {
        const opt = document.createElement("option");
        opt.value = tt.TicketTypeID;
        let text = tt.TypeName;
        if (tt.DiscountPercent > 0) {
            text += ` (-${tt.DiscountPercent}%)`;
        } else if (tt.StudentDiscountPercent > 0) {
            text += ` (-${tt.StudentDiscountPercent}% для студентів)`;
        }
        ticketTypeSelect.appendChild(opt);
        opt.textContent = text;
    });
}

function renderCarTypes() {
    carTypeSelect.innerHTML = "";
    carTypes.forEach(ct => {
        const opt = document.createElement("option");
        opt.value = ct.CarTypeID;
        opt.textContent = `${ct.CarTypeName} (${ct.ComfortLevel})`;
        carTypeSelect.appendChild(opt);
    });
}

function renderServices() {
    servicesListDiv.innerHTML = "";
    services.forEach(s => {
        const id = `service_${s.ServiceID}`;
        const label = document.createElement("label");
        label.style.display = "inline-flex";
        label.style.alignItems = "center";
        label.style.gap = "6px";
        label.style.marginRight = "10px";
        label.style.marginBottom = "4px";

        label.innerHTML = `
            <input type="checkbox" value="${s.ServiceID}" id="${id}">
            <span>${s.ServiceName} (+${s.ServicePrice.toFixed(2)} грн)</span>
        `;

        servicesListDiv.appendChild(label);
    });
}

// Пошук та відображення маршрутів
function searchRoutes() {
    const fromId = parseInt(fromStationSelect.value);
    const toId   = parseInt(toStationSelect.value);
    const rt     = routeTypeSelect.value; // "any", "direct", "transfer"

    let filtered = routes.filter(r => r.FromStationID === fromId && r.ToStationID === toId);

    if (rt === "direct") {
        filtered = filtered.filter(r => r.Type === "direct");
    } else if (rt === "transfer") {
        filtered = filtered.filter(r => r.Type === "transfer");
    }

    renderRoutes(filtered);
}

function renderRoutes(list) {
    routesTableBody.innerHTML = "";

    if (!list || list.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="6">За вказаними параметрами рейсів не знайдено.</td>`;
        routesTableBody.appendChild(tr);
        return;
    }

    list.forEach(r => {
        const tr = document.createElement("tr");

        let trainText = "-";
        let typeBadge = "";
        if (r.Type === "direct") {
            const t = trainById(r.TrainID);
            if (t) {
                trainText = `${t.TrainNumber} (${t.TrainType})`;
                typeBadge = `<span class="badge-type">${t.TrainCategory}</span>`;
            }
        } else if (r.Type === "transfer") {
            trainText = "Кілька поїздів";
            typeBadge = `<span class="badge-type badge-transfer">З пересадкою</span>`;
        }

        const fromName = stationNameById(r.FromStationID);
        const toName   = stationNameById(r.ToStationID);

        let timeText = "";
        let durationText = "";
        if (r.Type === "direct") {
            timeText = `${formatTime(r.DepartureDateTime)} → ${formatTime(r.ArrivalDateTime)}`;
            durationText = diffHoursMinutes(r.DepartureDateTime, r.ArrivalDateTime);
        } else if (r.Type === "transfer" && r.Legs && r.Legs.length === 2) {
            const leg1 = r.Legs[0];
            const leg2 = r.Legs[1];
            timeText = `${formatTime(leg1.DepartureDateTime)} → ${formatTime(leg2.ArrivalDateTime)}`;
            durationText = diffHoursMinutes(leg1.DepartureDateTime, leg2.ArrivalDateTime);
        }

        tr.innerHTML = `
            <td>
                ${trainText}<br>
                ${typeBadge}
            </td>
            <td>
                ${fromName} → ${toName}<br>
                <span class="hint">${r.Type === "transfer" ? "Маршрут з пересадкою" : "Прямий маршрут"}</span>
            </td>
            <td>
                ${timeText}<br>
                <span class="hint">${durationText}</span>
            </td>
            <td>
                ${r.Type === "transfer"
                    ? '<span class="badge-type badge-transfer">З пересадкою</span>'
                    : '<span class="badge-type">Прямий</span>'}
            </td>
            <td>${r.BasePrice.toFixed(2)} грн</td>
            <td>
                <button class="btn-outline btn-xs" onclick="showStops(${r.RouteID})">Станції</button>
                <button class="btn-primary btn-xs" onclick="selectRoute(${r.RouteID})">Обрати</button>
            </td>
        `;
        routesTableBody.appendChild(tr);
    });
}

// Показ проміжних станцій
function showStops(routeId) {
    const r = routes.find(x => x.RouteID === routeId);
    if (!r) return;

    stopsTableBody.innerHTML = "";

    const fromName = stationNameById(r.FromStationID);
    const toName   = stationNameById(r.ToStationID);
    stopsTitle.textContent = `Проміжні станції: ${fromName} → ${toName}`;

    if (!r.Stops || r.Stops.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="5">Проміжних станцій немає (прямий рейс без зупинок).</td>`;
        stopsTableBody.appendChild(tr);
    } else {
        r.Stops.forEach((s, idx) => {
            const tr = document.createElement("tr");
            const arr = s.ArrivalTime  ? formatTime(s.ArrivalTime)  : "-";
            const dep = s.DepartureTime ? formatTime(s.DepartureTime) : "-";
            let stopText = "-";
            if (s.ArrivalTime && s.DepartureTime) {
                stopText = diffHoursMinutes(s.ArrivalTime, s.DepartureTime);
            }
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${stationNameById(s.StationID)}</td>
                <td>${arr}</td>
                <td>${dep}</td>
                <td>${stopText}</td>
            `;
            stopsTableBody.appendChild(tr);
        });
    }

    stopsPanel.style.display = "flex";
}

btnCloseStops.addEventListener("click", () => {
    stopsPanel.style.display = "none";
});

stopsPanel.addEventListener("click", (e) => {
    if (e.target === stopsPanel) {
        stopsPanel.style.display = "none";
    }
});

// Вибір маршруту
function selectRoute(routeId) {
    const r = routes.find(x => x.RouteID === routeId);
    if (!r) return;
    selectedRoute = r;

    selectedRouteInfo.textContent = buildRouteDescription(r);
    orderFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Рендер квитка
function renderTicket(
    passenger,
    ticketType,
    carType,
    seat,
    car,
    servicesNames,
    basePrice,
    seatsCount,
    ticketStatus,
    orderStatus,
    paymentMethod
) {
    if (!ticketContent) return;

    const total = basePrice * (seatsCount || 1);

    const servicesText = (servicesNames && servicesNames.length > 0)
        ? servicesNames.join(", ")
        : "Без додаткових послуг";

    const seatsInfo = seatsCount && seatsCount > 1
        ? `Кількість місць: ${seatsCount} (купе на двох)`
        : `Кількість місць: 1`;

    const ticketStatusText = ticketStatus || "Невідомо";
    const orderStatusText  = orderStatus || "Невідомо";
    const paymentText      = paymentMethod || "Невідомо";

    ticketContent.innerHTML = `
        <div class="ticket-header">
            <div>
                <h3>Залізничний квиток (демо)</h3>
                <p>Пасажир: <strong>${passenger.FullName}</strong></p>
                <p>Маршрут: <strong>${buildRouteDescription(selectedRoute)}</strong></p>
            </div>
            <div class="ticket-status">
                <div>Статус квитка: <strong>${ticketStatusText}</strong></div>
                <div>Статус замовлення: <strong>${orderStatusText}</strong></div>
                <div>Оплата: <strong>${paymentText}</strong></div>
            </div>
        </div>

        <hr>

        <p><strong>Тип квитка:</strong> ${ticketType.TypeName}</p>
        <p><strong>Тип вагона:</strong> ${carType.CarTypeName}</p>
        <p><strong>Вагон:</strong> ${car || "не вказано"}, <strong>Місце:</strong> ${seat || "не вказано"}</p>
        <p>${seatsInfo}</p>
        <p><strong>Додаткові послуги:</strong> ${servicesText}</p>

        <hr>

        <p><strong>Вартість одного місця:</strong> ${basePrice.toFixed(2)} грн</p>
        <p><strong>Разом до оплати:</strong> ${total.toFixed(2)} грн</p>

        <p class="ticket-note">
            * Квиток згенерований у навчальному демо-режимі.
            Реальна система отримує дані з бази <strong>RailwayTicketsDB_V3</strong> 
            (таблиці Trips, Tickets, TicketServices тощо).
        </p>
    `;
}

// Журнал замовлень
function renderOrdersLog() {
    if (!ordersTableBody) return;

    ordersTableBody.innerHTML = "";

    let filtered = [...orders];

    // фільтр по пасажиру
    if (ordersPassengerSel && ordersPassengerSel.value) {
        const pid = parseInt(ordersPassengerSel.value);
        filtered = filtered.filter(o => o.PassengerID === pid);
    }

    // фільтр по даті
    const fromVal = ordersDateFrom && ordersDateFrom.value ? new Date(ordersDateFrom.value) : null;
    const toVal   = ordersDateTo && ordersDateTo.value ? new Date(ordersDateTo.value) : null;

    if (fromVal) {
        filtered = filtered.filter(o => {
            const d = new Date(o.OrderDate);
            const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const ff = new Date(fromVal.getFullYear(), fromVal.getMonth(), fromVal.getDate());
            return dd >= ff;
        });
    }

    if (toVal) {
        filtered = filtered.filter(o => {
            const d = new Date(o.OrderDate);
            const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const tt = new Date(toVal.getFullYear(), toVal.getMonth(), toVal.getDate());
            return dd <= tt;
        });
    }

    if (filtered.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="6">Замовлень за вказаними параметрами не знайдено.</td>`;
        ordersTableBody.appendChild(tr);
        return;
    }

    filtered.forEach(o => {
        const d = new Date(o.OrderDate);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yy = d.getFullYear();
        const hh = String(d.getHours()).padStart(2, '0');
        const mi = String(d.getMinutes()).padStart(2, '0');

        let statusText = o.Status;
        if (o.Status === "Передзамовлення" && o.ReservationUntil) {
            const r = new Date(o.ReservationUntil);
            const rh = String(r.getHours()).padStart(2, '0');
            const rm = String(r.getMinutes()).padStart(2, '0');
            statusText += ` (бронь до ${rh}:${rm})`;
        }

        let actionsHtml = "-";
        if (o.Status === "Передзамовлення") {
            actionsHtml = `
                <button class="btn-outline btn-xs" onclick="payPreorder(${o.OrderID})">Оплатити</button>
                <button class="btn-outline btn-xs" onclick="cancelOrder(${o.OrderID})">Скасувати</button>
            `;
        } else if (o.Status === "Оплачено") {
            actionsHtml = `
                <button class="btn-outline btn-xs" onclick="cancelOrder(${o.OrderID})">Скасувати</button>
            `;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dd}.${mm}.${yy} ${hh}:${mi}</td>
            <td>${o.PassengerName}</td>
            <td>${o.Route}</td>
            <td>${o.TotalAmount.toFixed(2)} грн</td>
            <td>${statusText}</td>
            <td>${actionsHtml}</td>
        `;
        ordersTableBody.appendChild(tr);
    });
}

// Оплата передзамовлення
function payPreorder(orderId) {
    const ord = orders.find(o => o.OrderID === orderId);
    if (!ord) return;

    if (ord.Status !== "Передзамовлення") {
        alert("Це замовлення не є передзамовленням.");
        return;
    }

    const now = new Date();
    if (ord.ReservationUntil && new Date(ord.ReservationUntil) < now) {
        // бронь прострочена
        alert("Бронь прострочена. Оплата неможлива. Замовлення буде скасовано.");
        ord.Status = "Скасовано";
        ord.ReservationUntil = null;

        ticketsHistory
            .filter(t => t.OrderID === orderId)
            .forEach(t => t.Status = "Повернений");

        renderOrdersLog();
        return;
    }

    // все ок — проводимо оплату
    ord.Status = "Оплачено";
    ord.ReservationUntil = null;

    ticketsHistory
        .filter(t => t.OrderID === orderId)
        .forEach(t => t.Status = "Активний");

    alert("Передзамовлення успішно оплачено.");
    renderOrdersLog();

    // якщо це поточний квиток на екрані — перемалюємо статуси
    if (currentOrderId === orderId) {
        const anyTicket = ticketsHistory.find(t => t.OrderID === orderId);
        if (anyTicket) {
            const passenger = passengers.find(p => p.PassengerID === anyTicket.PassengerID);
            const ticketType = ticketTypes.find(tt => tt.TicketTypeID === anyTicket.TicketTypeID);
            const carType    = carTypes.find(ct => ct.CarTypeID === anyTicket.CarTypeID);
            const servicesNames   = anyTicket.Services || [];
            const seatsCount = ticketsHistory.filter(t => t.OrderID === orderId).length;

            renderTicket(
                passenger,
                ticketType,
                carType,
                anyTicket.SeatNumber,
                anyTicket.CarNumber,
                servicesNames,
                anyTicket.Price,
                seatsCount,
                "Активний",
                "Оплачено",
                ord.PaymentMethod
            );
        }
    }
}

// Скасування замовлення
function cancelOrder(orderId) {
    const ord = orders.find(o => o.OrderID === orderId);
    if (!ord) return;

    if (!confirm("Точно скасувати це замовлення?")) return;

    ord.Status = "Скасовано";
    ord.ReservationUntil = null;

    ticketsHistory
        .filter(t => t.OrderID === orderId)
        .forEach(t => t.Status = "Повернений");

    alert("Замовлення скасовано. Квитки повернені.");
    renderOrdersLog();

    if (currentOrderId === orderId) {
        const anyTicket = ticketsHistory.find(t => t.OrderID === orderId);
        if (anyTicket) {
            const passenger = passengers.find(p => p.PassengerID === anyTicket.PassengerID);
            const ticketType = ticketTypes.find(tt => tt.TicketTypeID === anyTicket.TicketTypeID);
            const carType    = carTypes.find(ct => ct.CarTypeID === anyTicket.CarTypeID);
            const servicesNames   = anyTicket.Services || [];
            const seatsCount = ticketsHistory.filter(t => t.OrderID === orderId).length;

            renderTicket(
                passenger,
                ticketType,
                carType,
                anyTicket.SeatNumber,
                anyTicket.CarNumber,
                servicesNames,
                anyTicket.Price,
                seatsCount,
                "Повернений",
                "Скасовано",
                ord.PaymentMethod
            );
        }
    }
}

// ===========================
// ОБРОБНИКИ ПОДІЙ
// ===========================

if (btnSearchRoutes) {
    btnSearchRoutes.addEventListener("click", () => {
        searchRoutes();
    });
}

if (btnCalcPrice) {
    btnCalcPrice.addEventListener("click", () => {
        if (!selectedRoute) {
            alert("Спочатку оберіть маршрут.");
            return;
        }
        const price = calculateTicketPrice();
        if (!price || isNaN(price)) {
            calcPriceResult.textContent = "Не вдалося розрахувати ціну.";
        } else {
            let seatsCount = (doubleCoupeCheckbox && doubleCoupeCheckbox.checked) ? 2 : 1;
            const total = price * seatsCount;
            calcPriceResult.textContent = `Ціна за одне місце: ${price.toFixed(2)} грн, разом: ${total.toFixed(2)} грн.`;
        }
    });
}

if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener("click", () => {
        if (!selectedRoute) {
            alert("Маршрут не обрано.");
            return;
        }

        const passengerId = parseInt(passengerSelect.value);
        const passenger   = passengers.find(p => p.PassengerID === passengerId);
        if (!passenger) {
            alert("Оберіть пасажира.");
            return;
        }

        const ticketTypeId = parseInt(ticketTypeSelect.value);
        const ticketType   = ticketTypes.find(t => t.TicketTypeID === ticketTypeId);
        if (!ticketType) {
            alert("Оберіть тип квитка.");
            return;
        }

        const carTypeId = parseInt(carTypeSelect.value);
        const carType   = carTypes.find(c => c.CarTypeID === carTypeId);
        if (!carType) {
            alert("Оберіть тип вагона.");
            return;
        }

        const seat = seatNumberInput.value.trim();
        const car  = carNumberInput.value.trim();

        const finalPrice = calculateTicketPrice();
        if (!finalPrice || isNaN(finalPrice)) {
            alert("Спочатку розрахуйте ціну квитка (кнопка «Розрахувати ціну»).");
            return;
        }

        // список послуг для відображення
        const chosenServices = [];
        const serviceCheckboxes = servicesListDiv.querySelectorAll('input[type="checkbox"]');
        serviceCheckboxes.forEach(ch => {
            if (ch.checked) {
                const serviceId = parseInt(ch.value);
                const srv = services.find(s => s.ServiceID === serviceId);
                if (srv) chosenServices.push(srv.ServiceName);
            }
        });
        if (withAnimalCheckbox.checked) {
            chosenServices.push("Місце для тварини");
        }
        if (withBaggageCheckbox.checked) {
            chosenServices.push("Великий багаж");
        }

        // режим оплати
        let paymentMode = "pay";
        const checkedPayMode = Array.from(paymentModeRadios).find(r => r.checked);
        if (checkedPayMode) paymentMode = checkedPayMode.value; // "pay" або "preorder"

        const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value : "Невідомо";

        const now = new Date();
        let orderStatus = "Оплачено";
        let ticketStatus = "Активний";
        let reservationUntil = null;

        if (paymentMode === "preorder") {
            orderStatus = "Передзамовлення";
            ticketStatus = "Заброньовано";
            reservationUntil = new Date(now.getTime() + 15 * 60000); // +15 хвилин
        }

        // Купе на двох?
        const seatsCount = (doubleCoupeCheckbox && doubleCoupeCheckbox.checked) ? 2 : 1;

        const routeDescription = buildRouteDescription(selectedRoute);

        // сума для всього замовлення
        const totalOrderAmount = finalPrice * seatsCount;

        // 1. створюємо замовлення
        const orderId = nextOrderID++;
        orders.push({
            OrderID: orderId,
            OrderDate: now,
            PassengerID: passenger.PassengerID,
            PassengerName: passenger.FullName,
            Route: routeDescription,
            TotalAmount: totalOrderAmount,
            Status: orderStatus,
            ReservationUntil: reservationUntil,
            PaymentMethod: paymentMethod
        });

        // 2. створюємо квитки
        for (let i = 0; i < seatsCount; i++) {
            ticketsHistory.push({
                TicketID: nextTicketID++,
                OrderID: orderId,
                PassengerID: passenger.PassengerID,
                TicketTypeID: ticketType.TicketTypeID,
                CarTypeID: carType.CarTypeID,
                SeatNumber: seat,
                CarNumber: car,
                Price: finalPrice,
                Services: [...chosenServices],
                Route: routeDescription,
                Status: ticketStatus
            });
        }

        currentOrderId = orderId;

        // 3. малюємо квиток
        renderTicket(
            passenger,
            ticketType,
            carType,
            seat,
            car,
            chosenServices,
            finalPrice,
            seatsCount,
            ticketStatus,
            orderStatus,
            paymentMethod
        );

        ticketSection.classList.remove("hidden");
        ordersLogSection.classList.remove("hidden");
        renderOrdersLog();

        if (orderStatus === "Передзамовлення") {
            alert("Створено передзамовлення (бронь) у демо-режимі.");
        } else {
            alert("Замовлення оформлено та оплачено (демо-режим).");
        }
    });
}

if (btnShowOrders) {
    btnShowOrders.addEventListener("click", () => {
        renderOrdersLog();
        ordersLogSection.classList.remove("hidden");
    });
}

if (btnPrintTicket) {
    btnPrintTicket.addEventListener("click", () => {
        window.print();
    });
}

// ===========================
// ІНІЦІАЛІЗАЦІЯ
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    renderStationsSelects();
    renderPassengers();
    renderTicketTypes();
    renderCarTypes();
    renderServices();

    // сьогоднішню дату в поле пошуку
    if (searchDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        searchDateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // Із початку ховаємо квиток / журнал (на всяк випадок)
    ticketSection.classList.add("hidden");
    ordersLogSection.classList.add("hidden");

    // Початковий рендер маршрутів для прикладу
    renderRoutes(routes.filter(r => r.FromStationID === 1 && r.ToStationID === 2));
});
