const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let formDataStore = [];

// Endpoint POST
app.post('/api/form', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });
  }

  const newEntry = {
    id: formDataStore.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  formDataStore.push(newEntry);

  res.status(201).json({
    success: true,
    message: 'Data berhasil disimpan.',
    data: newEntry,
  });
});

// Endpoint GET
app.get('/api/form', (req, res) => {
  res.status(200).json({
    success: true,
    total: formDataStore.length,
    data: formDataStore,
  });
});

// Endpoint GET by ID
app.get('/api/form/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = formDataStore.find((item) => item.id === id);

  if (!entry) {
    return res.status(404).json({
      success: false,
      message: `Data dengan ID ${id} tidak ditemukan.`,
    });
  }

  res.status(200).json({
    success: true,
    data: entry,
  });
});

// Endpoint DELETE by ID: Hapus data tertentu
app.delete('/api/form/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = formDataStore.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Data dengan ID ${id} tidak ditemukan.`,
    });
  }

  const deleted = formDataStore.splice(index, 1);

  res.status(200).json({
    success: true,
    message: `Data dengan ID ${id} berhasil dihapus.`,
    deleted,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
