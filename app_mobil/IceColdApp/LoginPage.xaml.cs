using MongoDB.Driver;

namespace IceColdApp;

public partial class LoginPage : ContentPage
{
    // Cadena de conexión a MongoDB.
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";

    public LoginPage()
    {
        InitializeComponent();
    }

    // Se ejecuta al puslar el botón de iniciar sesión.
    private async void OnLoginClicked(object sender, EventArgs e)
    {
        //Se guarda el correo y la contraseña.
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        //Notifica los campos no rellenados.
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, ingresa tu correo y contraseña", "OK");
            return;
        }

        try
        {
            //Conecta con MongoDB.
            MongoClient cliente = new MongoClient(conexionMongo);
            IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
            IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

            //Busca al usuario con el correo y contraseña.
            Usuario usuarioEncontrado = await coleccionUsuarios.Find(u => u.Email == email && u.Password == password).FirstOrDefaultAsync();

            if (usuarioEncontrado != null)
            {
                // Guardamos el usuario en la sesión global.
                SesionGlobal.UsuarioActual = usuarioEncontrado;
                
                //Muestra mensaje de bienvenida.
                await DisplayAlert("¡Bienvenido!", $"Hola de nuevo, {usuarioEncontrado.Nombre}", "OK");
                //Vuelve a la página de atrás.
                await Shell.Current.GoToAsync("..");
            }
            else
            {
                //Salta la notificación, si las credenciales no existen o son incorrectas.
                await DisplayAlert("Error", "Correo o contraseña incorrectos", "OK");
            }
        }
        catch (Exception ex)
        {
            //Notifica si hay error de conexión.
            await DisplayAlert("Error de conexión", $"Hubo un problema: {ex.Message}", "OK");
        }
    }

    //Abre la pantalla de registro.
    private async void OnRegisterClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(RegisterPage));
    }
}