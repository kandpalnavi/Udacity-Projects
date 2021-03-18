var Client;
(() => {
    "use strict";
    var e = {
            d: (t, r) => {
                for (var o in r) e.o(r, o) && !e.o(t, o) && Object.defineProperty(t, o, {
                    enumerable: !0,
                    get: r[o]
                })
            },
            o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
            r: e => {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
        },
        t = {};

    function r(e, t, r, o, c, a, n) {
        try {
            var l = e[a](n),
                i = l.value
        } catch (e) {
            return void r(e)
        }
        l.done ? t(i) : Promise.resolve(i).then(o, c)
    }
    e.r(t), e.d(t, {
        makePost: () => c,
        updateUI: () => o
    });
    var o = e => {
            var {
                rh: t,
                name: r,
                pres: o,
                temp: c,
                precip: a,
                webformatURL: n,
                description: l,
                forecastDate: i,
                countryName: u,
                capital: s,
                currencies: m,
                currSymb: d,
                languages: g,
                population: y,
                flag: S
            } = e;
            localStorage.clear();
            var p = document.querySelector(".error"),
                f = document.querySelectorAll(".ui-data");
            "invalid" == r ? (p.innerHTML = '<i class="fas fa-exclamation-triangle"></i>city not recognized by GeoNames please try again!', p.classList.remove("hide"), f.forEach((e => {
                e.classList.add("hide")
            }))) : (f.forEach((e => {
                e.classList.remove("hide")
            })), p.classList.contains("hide") || p.classList.add("hide"), "N/A" == t ? (document.querySelector(".city-country").innerHTML = "".concat(r, ", ").concat(u), document.querySelector(".description").innerHTML = "Description: ".concat(l), document.querySelector(".forecast-date").innerHTML = "Forecast for ".concat(i, ":"), document.querySelector(".temperature").innerHTML = "Temperature: N/A", document.querySelector(".rh").innerHTML = "Humidity: N/A", document.querySelector(".pres").innerHTML = "Pressure: N/A", document.querySelector(".precip").innerHTML = "Precipitation: N/A", document.querySelector(".city-image").src = "".concat(n)) : (document.querySelector(".city-country").innerHTML = "".concat(r, ", ").concat(u), document.querySelector(".description").innerHTML = "Description: ".concat(l), document.querySelector(".forecast-date").innerHTML = "Forecast for ".concat(i, ":"), document.querySelector(".temperature").innerHTML = "Temperature: ".concat(c, " degrees Celsius"), document.querySelector(".rh").innerHTML = "Humidity: ".concat(t, " %"), document.querySelector(".pres").innerHTML = "Pressure: ".concat(o, " mb"), document.querySelector(".precip").innerHTML = "Precipitation: ".concat(a, " mm"), document.querySelector(".city-image").src = "".concat(n)), document.querySelector(".country-info").innerHTML = "Facts about: ".concat(u), document.querySelector(".capital").innerHTML = "Capital: ".concat(s), document.querySelector(".currencies").innerHTML = "Currency: ".concat(d, " ").concat(m), document.querySelector(".languages").innerHTML = "One of the official languages is: ".concat(g), document.querySelector(".population").innerHTML = "Population: ".concat(y), document.querySelector(".flag-image").src = "".concat(S)), localStorage.setItem("rh", t), localStorage.setItem("name", r), localStorage.setItem("pres", o), localStorage.setItem("temp", c), localStorage.setItem("precip", a), localStorage.setItem("webformatURL", n), localStorage.setItem("description", l), localStorage.setItem("forecastDate", i), localStorage.setItem("countryName", u), localStorage.setItem("capital", s), localStorage.setItem("currencies", m), localStorage.setItem("currSymb", d), localStorage.setItem("languages", g), localStorage.setItem("population", y), localStorage.setItem("flag", S)
        },
        c = function() {
            var e, t = (e = function*() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = yield fetch(e, {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(t)
                    });
                try {
                    var o = yield r.json();
                    return o
                } catch (e) {
                    console.log("error".concat(e))
                }
            }, function() {
                var t = this,
                    o = arguments;
                return new Promise((function(c, a) {
                    var n = e.apply(t, o);

                    function l(e) {
                        r(n, c, a, l, i, "next", e)
                    }

                    function i(e) {
                        r(n, c, a, l, i, "throw", e)
                    }
                    l(void 0)
                }))
            });
            return function() {
                return t.apply(this, arguments)
            }
        }();

    function a(e, t, r, o, c, a, n) {
        try {
            var l = e[a](n),
                i = l.value
        } catch (e) {
            return void r(e)
        }
        l.done ? t(i) : Promise.resolve(i).then(o, c)
    }

    function n(e) {
        return function() {
            var t = this,
                r = arguments;
            return new Promise((function(o, c) {
                var n = e.apply(t, r);

                function l(e) {
                    a(n, o, c, l, i, "next", e)
                }

                function i(e) {
                    a(n, o, c, l, i, "throw", e)
                }
                l(void 0)
            }))
        }
    }
    var l = document.querySelectorAll(".ui-data"),
        i = document.querySelector(".btn-submit"),
        u = document.querySelector(".error"),
        s = (document.querySelector(".btn-reset").addEventListener("click", (() => {
            document.querySelector(".city-entered").value = "", document.querySelector(".date").value = "", l.forEach((e => {
                e.classList.add("hide")
            })), u.classList.add("hide"), localStorage.clear()
        })), i.addEventListener("click", n((function*() {
            var e = document.querySelector(".city-entered").value,
                t = document.querySelector(".date").value;
            if ("" == e || "" == t) return u.innerHTML = '<i class="fas fa-exclamation-triangle"></i>City or Date incorrect, please re-enter input', void u.classList.remove("hide");
            var r = yield Client.makePost("/getCityInfo", {
                city: e,
                date: t
            });
            Client.updateUI(r)
        }))), new Date),
        m = s.getDate(),
        d = s.getMonth() + 1,
        g = s.getFullYear();
    m < 10 && (m = "0" + m), d < 10 && (d = "0" + d), s = g + "-" + d + "-" + m, document.querySelector(".date").setAttribute("min", s), window.onload = () => {
        if (localStorage.length > 5) {
            var e = localStorage.getItem("rh"),
                t = localStorage.getItem("name"),
                r = localStorage.getItem("pres"),
                o = localStorage.getItem("temp"),
                c = localStorage.getItem("precip"),
                a = localStorage.getItem("webformatURL"),
                n = localStorage.getItem("description"),
                l = localStorage.getItem("forecastDate"),
                i = localStorage.getItem("countryName"),
                u = localStorage.getItem("capital"),
                s = localStorage.getItem("currencies"),
                m = localStorage.getItem("currSymb"),
                d = localStorage.getItem("languages"),
                g = localStorage.getItem("population"),
                y = localStorage.getItem("flag");
            Client.updateUI({
                rh: e,
                name: t,
                pres: r,
                temp: o,
                precip: c,
                webformatURL: a,
                description: n,
                forecastDate: l,
                countryName: i,
                capital: u,
                currencies: s,
                currSymb: m,
                languages: d,
                population: g,
                flag: y
            })
        }
    }, Client = t
})();