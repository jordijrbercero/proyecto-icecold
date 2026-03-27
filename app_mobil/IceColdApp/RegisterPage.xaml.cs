using MongoDB.Driver;

namespace IceColdApp;

public partial class RegisterPage : ContentPage
{
    public RegisterPage()
    {
        InitializeComponent();
    }

    private async void OnGuardarRegistroClicked(object sender, EventArgs e)
    {
        // Asegúrate de que los x:Name en tu XAML coinciden con estos
        string nombre = NombreEntry.Text;
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, rellena todos los campos", "OK");
            return;
        }

        try
        {
            string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";
            
            MongoClient cliente = new MongoClient(conexionMongo);
            IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
            IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

            Usuario nuevoUsuario = new Usuario
            {
                Nombre = nombre,
                Email = email,
                Password = password
            };

            await coleccionUsuarios.InsertOneAsync(nuevoUsuario);

            await DisplayAlert("Éxito", "Usuario registrado correctamente", "OK");
            
            // Vuelve a la pantalla de login
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            // Si algo falla, te mostrará este mensaje en lugar de cerrarse
            await DisplayAlert("Error al registrar", $"Motivo: {ex.Message}", "OK");
        }
    }
}