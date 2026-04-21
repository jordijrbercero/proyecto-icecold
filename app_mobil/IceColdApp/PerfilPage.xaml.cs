using System;
using System.IO;
using Microsoft.Maui.Controls;
using MongoDB.Driver;

namespace IceColdApp;

public partial class PerfilPage : ContentPage
{
    // Cadena de conexión a MongoDB.
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";

    public PerfilPage()
    {
        InitializeComponent();
        CargarDatosUsuario();
    }

    //Carga los datos del usuario en pantalla.
    private void CargarDatosUsuario()
    {
        if (SesionGlobal.UsuarioActual != null)
        {
            //Muestra el nombre y correo del usuario.
            NombreLabel.Text = SesionGlobal.UsuarioActual.Nombre;
            EmailLabel.Text = SesionGlobal.UsuarioActual.Email;

            //Muestra la foto de perfil si tiene.
            if (!string.IsNullOrEmpty(SesionGlobal.UsuarioActual.FotoPerfilBase64))
            {
                byte[] bytesImagen = Convert.FromBase64String(SesionGlobal.UsuarioActual.FotoPerfilBase64);
                FotoPerfilImagen.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));
            }
        }
    }

    //Permite añadir una foto de perfil.
    private async void OnCambiarFotoClicked(object sender, EventArgs e)
    {
        try
        {
            //Permite seleccionar una foto de la galeria.
            FileResult fotoElegida = await MediaPicker.Default.PickPhotoAsync();

            if (fotoElegida != null)
            {
                //Lee la imagen agregada.
                Stream stream = await fotoElegida.OpenReadAsync();
                MemoryStream memoryStream = new MemoryStream();
                await stream.CopyToAsync(memoryStream);
                byte[] bytesImagen = memoryStream.ToArray();

                //Convierte la imagen de Base64
                string base64String = Convert.ToBase64String(bytesImagen);
                
                // Guarda la foto en la sesión actual y la muestra en pantalla
                SesionGlobal.UsuarioActual.FotoPerfilBase64 = base64String;
                FotoPerfilImagen.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));

                //Conexión a MongoDB.
                MongoClient cliente = new MongoClient(conexionMongo);
                IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
                IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

                //Busca el usuario por su correo.
                FilterDefinition<Usuario> filtro = Builders<Usuario>.Filter.Eq(u => u.Email, SesionGlobal.UsuarioActual.Email);

                //Actualiza la foto de perfil en la base de datos.
                UpdateDefinition<Usuario> actualizacion = Builders<Usuario>.Update.Set(u => u.FotoPerfilBase64, base64String);

                await coleccionUsuarios.UpdateOneAsync(filtro, actualizacion);

                //Notifica si la foto se actualizó correctamente.
                await DisplayAlert("Éxito", "Foto de perfil actualizada", "OK");
            }
        }
        catch (Exception ex)
        {
            // Muestra un error si no se pudo cambiar la foto
            await DisplayAlert("Error", $"No se pudo cambiar la foto: {ex.Message}", "OK");
        }
    }

    // Cierra la sesión del usuario
    private async void OnCerrarSesionClicked(object sender, EventArgs e)
    {
        // Borra el usuario actual de la sesión
        SesionGlobal.UsuarioActual = null;

        //Vuelve a la página de atrás.
        await Shell.Current.GoToAsync("..");
    }
}