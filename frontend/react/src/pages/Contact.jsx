import React, { useState } from "react";

const Contact = () => {
    // Cria objeto Form com a propriedade email e message
    const [form, setForm] = useState({ email: "", message: "" });

    // Atualiza os campos para o React
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envia os dados
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulário enviado:", form);
        alert("Mensagem enviada com sucesso!");
        setForm({ email: "", message: "" });
    };

    return (
        <div className="container mt-5 mb-5">
        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
            <h3 className="text-center mb-4">
            Contate-nos
            </h3>

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="seuemail@exemplo.com" value={form.email} onChange={handleChange} required/>
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensagem</label>
                <textarea className="form-control" id="message" name="message" rows="4" placeholder="Escreva sua mensagem aqui..." value={form.message} onChange={handleChange} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Enviar
            </button>
            </form>
        </div>
        </div>
    );
};

export default Contact;
