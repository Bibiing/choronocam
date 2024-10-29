// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../frontend'));


app.use(session({
    secret: '12345', // Ganti dengan kunci rahasia yang aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Atur ke true jika menggunakan HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Buat folder views 

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/loggerCCTV', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rute POST untuk menyimpan data
app.post('/addUser', async (req, res) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;
    const newUser = new User({ firstName, lastName, email, phone, password, confirmPassword });
    await newUser.save();
    res.redirect('/users');
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Temukan pengguna berdasarkan email dan password
    const user = await User.findOne({ email, password });

    if (user) {
        // Simpan nama pengguna di sesi
        req.session.username = `${user.firstName} ${user.lastName}`;
        res.redirect('/'); // Arahkan kembali ke halaman utama
    } else {
        res.send('Invalid email or password'); // Tangani kesalahan login
    }
});



// Rute untuk logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/'); // Tangani kesalahan
        }
        res.redirect('/'); // Arahkan kembali ke halaman utama setelah logout
    });
});




app.get('/', (req, res) => {
    const username = req.session.username; // Ambil nama pengguna dari sesi
    res.render('main', { username }); // Kirim nama pengguna ke tampilan
});

app.get('/main.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/public/main.html'));
});

app.get('/Playback.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/public/Playback.html'));
});

app.get('/sign-up.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/public/sign-up.html'));
});

app.get('/sign-in.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', '/public/sign-in.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
