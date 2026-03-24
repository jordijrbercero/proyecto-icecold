using MongoDB.Driver;
using Microsoft.Maui.Controls;
using System;

namespace IceColdApp;

public partial class RegisterPage : ContentPage
{
    
    string conexionMongo = "mongodb://10.0.2.2:27017";

    public RegisterPage()
    {
        InitializeComponent();
    }

    private async void OnGuardarRegistroClicked(object sender, EventArgs e)
    {
        
       

        string nombre = NombreEntry.Text;
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, rellena todos los campos", "OK");
            return;
        }

        MongoClient cliente = new MongoClient(conexionMongo);
        IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
        IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

        Usuario nuevoUsuario = new Usuario
        {
            Nombre = nombre,
            Email = email,
            Password = password
        };

        // 2. SI SE QUEDA PILLADO, SERÁ EXACTAMENTE EN ESTA LÍNEA
        await coleccionUsuarios.InsertOneAsync(nuevoUsuario);

        await DisplayAlert("Bienvenido", "Usuario registrado correctamente ", "OK");
        await Shell.Current.GoToAsync("..");
    }
}