import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';

const app = express();
app.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

const today = dayjs().format('M/DD/YYYY');

const todaysHoliday = holidays.find(holiday => holiday.date === today);

app.get('/holidays', (req, res) => {
    res.send(holidays)
});

app.get('/is-today-holiday', (req, res) => {
    const message = todaysHoliday ?
        `Sim, hoje é ${todaysHoliday.name}`
    :
        'Não, hoje não é feriado'

    res.send(message)
})

app.get('/holidays/:month', (req, res) => {
    const { month } = req.params;

    if (month < 1 || month > 12) {
        res.send('Insira um mês válido!')
        return
    };

    const monthHolidays = holidays.filter(holiday =>  {
        const holidayMonth = holiday.date.split('/')[0]
        
        return holidayMonth === month
    })

    res.send(monthHolidays)
})

app.listen(4000, () => {
    console.log('server is open...')
})