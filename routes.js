const express = require("express");
const router = express.Router();

const productos = require("./data");

// GET - Obtener todos los productos
router.get("/productos", (req, res) => {
    res.status(200).json(productos);
});

// GET - Obtener producto por ID
router.get("/productos/:id", (req, res) => {

    const producto = productos.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.status(200).json(producto);
});

// POST - Crear producto
router.post("/productos", (req, res) => {

    const { nombre, precio, categoria } = req.body;

    if (!nombre || precio === undefined) {
        return res.status(400).json({
            mensaje: "Nombre y precio son obligatorios"
        });
    }

    if (typeof precio !== "number") {
        return res.status(400).json({
            mensaje: "El precio debe ser un número"
        });
    }

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        categoria
    };

    productos.push(nuevoProducto);

    res.status(201).json({
        mensaje: "Producto creado correctamente",
        producto: nuevoProducto
    });
});

// PUT - Actualizar producto
router.put("/productos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const producto = productos.find(
        p => p.id === id
    );

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    const { nombre, precio, categoria } = req.body;

    if (!nombre || precio === undefined) {
        return res.status(400).json({
            mensaje: "Nombre y precio son obligatorios"
        });
    }

    if (typeof precio !== "number") {
        return res.status(400).json({
            mensaje: "El precio debe ser un número"
        });
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.categoria = categoria;

    res.status(200).json({
        mensaje: "Producto actualizado correctamente",
        producto
    });
});

// DELETE - Eliminar producto
router.delete("/productos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const indice = productos.findIndex(
        p => p.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    const productoEliminado = productos.splice(indice, 1);

    res.status(200).json({
        mensaje: "Producto eliminado correctamente",
        producto: productoEliminado[0]
    });
});

module.exports = router;