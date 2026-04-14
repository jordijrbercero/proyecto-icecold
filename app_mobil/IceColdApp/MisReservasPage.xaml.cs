using MongoDB.Driver;

namespace IceColdApp;

public partial class MisReservasPage : ContentPage
{
    // cadena conexion
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";
    IMongoCollection<ReservaModel> coleccionReservas;

    public MisReservasPage()
    {
        InitializeComponent();

        // Conectar a Mongo
        var settings = MongoClientSettings.FromConnectionString(conexionMongo);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        var clienteMongo = new MongoClient(settings);
        var baseDeDatos = clienteMongo.GetDatabase("IceColdDB");
        coleccionReservas = baseDeDatos.GetCollection<ReservaModel>("Reservas");
    }

    // Esta función se ejecuta automáticamente cada vez que se abre la pantalla
    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await CargarMisReservas();
    }

    private async Task CargarMisReservas()
    {
        try
        {
            if (SesionGlobal.UsuarioActual == null) return;

            // Buscamos en Mongo las reservas que coincidan con el Email del usuario que tiene la sesión iniciada
            var filtro = Builders<ReservaModel>.Filter.Eq(r => r.ClienteEmail, SesionGlobal.UsuarioActual.Email);
            var misReservas = await coleccionReservas.Find(filtro).ToListAsync();

            if (misReservas.Count > 0)
            {
                ListaMisReservas.ItemsSource = misReservas;
                ListaMisReservas.IsVisible = true;
                MensajeVacio.IsVisible = false;
            }
            else
            {
                ListaMisReservas.IsVisible = false;
                MensajeVacio.IsVisible = true;
            }
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", "No pudimos cargar tus reservas.", "OK");
        }
    }

    // FUNCIÓN: VER RESERVA
    private async void OnVerClicked(object sender, EventArgs e)
    {
        var boton = (Button)sender;
        var reservaSeleccionada = (ReservaModel)boton.CommandParameter;

        string detalles = $"Servicio: {reservaSeleccionada.Servicio}\n" +
                          $"Barbero: {reservaSeleccionada.Barbero}\n" +
                          $"Día: {reservaSeleccionada.Dia}\n" +
                          $"Hora: {reservaSeleccionada.Hora}\n" +
                          $"Precio: {reservaSeleccionada.Precio}\n\n" +
                          $"¡Te esperamos 5 minutos antes de tu cita!";

        await DisplayAlert("Detalles de tu cita", detalles, "Cerrar");
    }

    // FUNCIÓN: CANCELAR RESERVA
    private async void OnCancelarClicked(object sender, EventArgs e)
    {
        var boton = (Button)sender;
        var reservaSeleccionada = (ReservaModel)boton.CommandParameter;

        bool confirmar = await DisplayAlert("Cancelar Cita", $"¿Estás seguro de que quieres cancelar tu cita para el {reservaSeleccionada.Dia} a las {reservaSeleccionada.Hora}?", "Sí, cancelar", "No, mantener");

        if (confirmar)
        {
            try
            {
                // Borramos de MongoDB usando el ID único de la reserva
                var filtroBorrar = Builders<ReservaModel>.Filter.Eq(r => r.Id, reservaSeleccionada.Id);
                await coleccionReservas.DeleteOneAsync(filtroBorrar);

                await DisplayAlert("Cancelada", "Tu reserva ha sido cancelada con éxito.", "OK");

                // Recargamos la lista para que desaparezca visualmente
                await CargarMisReservas();
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", "No se pudo cancelar la reserva.", "OK");
            }
        }
    }
}