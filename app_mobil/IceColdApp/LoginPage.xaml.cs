using MongoDB.Driver;

namespace IceColdApp;

public partial class LoginPage : ContentPage
{
    // Cadena de conexión corregida
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";

    public LoginPage()
    {
        InitializeComponent();
    }

    private async void OnLoginClicked(object sender, EventArgs e)
    {
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, ingresa tu correo y contraseña", "OK");
            return;
        }

        try
        {
            MongoClient cliente = new MongoClient(conexionMongo);
            IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
            IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

            Usuario usuarioEncontrado = await coleccionUsuarios.Find(u => u.Email == email && u.Password == password).FirstOrDefaultAsync();

            if (usuarioEncontrado != null)
            {
                // Guardamos el usuario en la sesión global
                SesionGlobal.UsuarioActual = usuarioEncontrado;

                await DisplayAlert("¡Bienvenido!", $"Hola de nuevo, {usuarioEncontrado.Nombre}", "OK");
                await Shell.Current.GoToAsync("..");
            }
            else
            {
                await DisplayAlert("Error", "Correo o contraseña incorrectos", "OK");
            }
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error de conexión", $"Hubo un problema: {ex.Message}", "OK");
        }
    }

    private async void OnRegisterClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(RegisterPage));
    }
}