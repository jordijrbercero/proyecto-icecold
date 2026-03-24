using System;
using System.IO;
using Microsoft.Maui.Controls;
using MongoDB.Driver;

namespace IceColdApp;

public partial class PerfilPage : ContentPage
{

    string conexionMongo = "mongodb://10.0.2.2:27017";

    public PerfilPage()
    {
        InitializeComponent();
        CargarDatosUsuario();
    }

    private void CargarDatosUsuario()
    {
        if (SesionGlobal.UsuarioActual != null)
        {
            
            NombreLabel.Text = SesionGlobal.UsuarioActual.Nombre;
            EmailLabel.Text = SesionGlobal.UsuarioActual.Email;

            
            if (!string.IsNullOrEmpty(SesionGlobal.UsuarioActual.FotoPerfilBase64))
            {
                byte[] bytesImagen = Convert.FromBase64String(SesionGlobal.UsuarioActual.FotoPerfilBase64);
                FotoPerfilImagen.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));
            }
        }
    }

    
    private async void OnCambiarFotoClicked(object sender, EventArgs e)
    {
        try
        {
            FileResult fotoElegida = await MediaPicker.Default.PickPhotoAsync();

            if (fotoElegida != null)
            {
                Stream stream = await fotoElegida.OpenReadAsync();
                MemoryStream memoryStream = new MemoryStream();
                await stream.CopyToAsync(memoryStream);
                byte[] bytesImagen = memoryStream.ToArray();

                string base64String = Convert.ToBase64String(bytesImagen);

                SesionGlobal.UsuarioActual.FotoPerfilBase64 = base64String;
                FotoPerfilImagen.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));

                MongoClient cliente = new MongoClient(conexionMongo);
                IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
                IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

                FilterDefinition<Usuario> filtro = Builders<Usuario>.Filter.Eq(u => u.Email, SesionGlobal.UsuarioActual.Email);
                UpdateDefinition<Usuario> actualizacion = Builders<Usuario>.Update.Set(u => u.FotoPerfilBase64, base64String);

                await coleccionUsuarios.UpdateOneAsync(filtro, actualizacion);

                await DisplayAlert("Éxito", "Foto de perfil actualizada", "OK");
            }
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", $"No se pudo cambiar la foto: {ex.Message}", "OK");
        }
    }

   
    private async void OnCerrarSesionClicked(object sender, EventArgs e)
    {
        
        SesionGlobal.UsuarioActual = null;

        
        await Shell.Current.GoToAsync("..");
    }
}