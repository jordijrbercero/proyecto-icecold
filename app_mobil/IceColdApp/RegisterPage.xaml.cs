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
        
        string nombre = NombreEntry.Text;
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, rellena todos los campos", "OK");
            return;
        }

        
        bool tieneNumero = false;
        foreach (char c in password)
        {
            if (char.IsDigit(c))
            {
                tieneNumero = true;
                break;
            }
        }

        if (password.Length < 8 || !tieneNumero)
        {
            await DisplayAlert("Contraseña débil", "La contraseña debe tener al menos 8 caracteres y contener al menos un número.", "OK");
            return;
        }
       

        try
        {
            string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";

            MongoClient cliente = new MongoClient(conexionMongo);
            IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
            IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

            
            Usuario usuarioExistente = await coleccionUsuarios.Find(u => u.Nombre == nombre || u.Email == email).FirstOrDefaultAsync();
            if (usuarioExistente != null)
            {
                if (usuarioExistente.Nombre == nombre)
                {
                    await DisplayAlert("Error", "Este nombre ya está en uso", "OK");
                }
                else
                {
                    await DisplayAlert("Error", "Este correo electrónico ya está registrado", "OK");
                }
                return;
            }
            

            Usuario nuevoUsuario = new Usuario
            {
                Nombre = nombre,
                Email = email,
                Password = password
            };

            await coleccionUsuarios.InsertOneAsync(nuevoUsuario);

            await DisplayAlert("Bienvenido", "Usuario registrado correctamente", "OK");

            
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            
            await DisplayAlert("Error al registrar", $"Motivo: {ex.Message}", "OK");
        }
    }
}