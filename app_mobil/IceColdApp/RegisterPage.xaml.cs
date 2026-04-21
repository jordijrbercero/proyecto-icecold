using MongoDB.Driver;

namespace IceColdApp;

public partial class RegisterPage : ContentPage
{
    public RegisterPage()
    {
        InitializeComponent();
    }

    //Se ejecuta al puslar el botón de guardar registro.
    private async void OnGuardarRegistroClicked(object sender, EventArgs e)
    {
        
        //Se guardan los datos escritos por el usuario
        string nombre = NombreEntry.Text;
        string email = EmailEntry.Text;
        string password = PasswordEntry.Text;

        //Comprueba que los campos están completos.
        if (string.IsNullOrEmpty(nombre) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            await DisplayAlert("Error", "Por favor, rellena todos los campos", "OK");
            return;
        }

        //Comprueba si la contraseña contiene al menos un número.
        bool tieneNumero = false;
        foreach (char c in password)
        {
            if (char.IsDigit(c))
            {
                tieneNumero = true;
                break;
            }
        }

        //Comprueba si la contraseña es segura.
        if (password.Length < 8 || !tieneNumero)
        {
            await DisplayAlert("Contraseña débil", "La contraseña debe tener al menos 8 caracteres y contener al menos un número.", "OK");
            return;
        }
       

        try
        {
            //Conexión a MongoDB.
            string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";

            MongoClient cliente = new MongoClient(conexionMongo);
            IMongoDatabase baseDeDatos = cliente.GetDatabase("IceColdDB");
            IMongoCollection<Usuario> coleccionUsuarios = baseDeDatos.GetCollection<Usuario>("Usuarios");

            //Se conecta con la base de datos.
            Usuario usuarioExistente = await coleccionUsuarios.Find(u => u.Nombre == nombre || u.Email == email).FirstOrDefaultAsync();
            if (usuarioExistente != null)
            {
                //Notifica si el nombre ya existe.
                if (usuarioExistente.Nombre == nombre)
                {
                    await DisplayAlert("Error", "Este nombre ya está en uso", "OK");
                }
                else
                {
                    //Notifica si el correo ya esta registrado.
                    await DisplayAlert("Error", "Este correo electrónico ya está registrado", "OK");
                }
                return;
            }
            
            //Se crea un nuevo usuario con los datos introducidos.
            Usuario nuevoUsuario = new Usuario
            {
                Nombre = nombre,
                Email = email,
                Password = password
            };

            //Guarda el nuevo usuario en MongoDB.
            await coleccionUsuarios.InsertOneAsync(nuevoUsuario);

            //Notifica que el registro a sido existoso.
            await DisplayAlert("Bienvenido", "Usuario registrado correctamente", "OK");

            //Vuelve a la página de atrás.
            await Shell.Current.GoToAsync("..");
        }
        catch (Exception ex)
        {
            //Notifica si hay algún error en el registro.
            await DisplayAlert("Error al registrar", $"Motivo: {ex.Message}", "OK");
        }
    }
}