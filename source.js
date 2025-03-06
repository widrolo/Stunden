let names = []

let weekData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let best = {
    day: 0,
    period: 0,
    score: 0
}

function add() {
    let field = document.getElementById("field");

    if (!validNames.includes(field.value)) return;

    names.push(field.value);

    field.value = ""; // literally just for feedback. If it didnt clear, then there was a typo
}

function search() {
    clear();

    // cry me a river
    names.forEach(name => {
        SearchAndApply(Montag, 0, name);
        SearchAndApply(Dienstag, 1, name);
        SearchAndApply(Mittwoch, 2, name);
        SearchAndApply(Donnerstag, 3, name);
        SearchAndApply(Freitag, 4, name);
    });

    FindBest();

    Display();

    console.log(weekData);
}

function clear() {
    weekData.forEach(day => {
        // array.forEach returns a copy of the data, for uses a refrence.
        for (let i = 0; i < day.length; i++) {
            day[i] = 0;
        }
    });
}

function SearchAndApply(database, day, name) {
    //didnt feel like using a array.forEach
    for (let i = 0; i < database.length; i++) {
        const element = database[i];
        if (element.length == 0) continue;
        for (let j = 0; j < element.length; j++) {
            const e = element[j];
            if (e == name)
            {
                weekData[day][i]++;
                break;
            }
        }
    }
}

function FindBest() {
    for (let i = 0; i < weekData.length; i++) {
        const day = weekData[i];
        for (let j = 0; j < day.length; j++) {
            const periodScore = day[j];
            if (periodScore > best.score)
            {
                best.day = i;
                best.period = j;
                best.score = periodScore;
            }
        }
    }
}

function Display() {
    let res = document.getElementById("res");

    let resText = "";

    resText += NumToDay(best.day);
    resText += ", "
    resText += (best.period + 1).toString();
    resText += "std : ";
    resText += (best.score).toString();

    res.innerHTML = resText;
}

function NumToDay(day)
{
    switch (day) {
        case 0:
            return "Montag";
        case 1:
            return "Dienstag";
        case 2:
            return "Mittwoch";
        case 3:
            return "Donnerstag";
        case 4:
            return "Freitag";
    
        default:
            return "ERR";
    }
}
