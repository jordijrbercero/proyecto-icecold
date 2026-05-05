using MongoDB.Driver;

namespace IceColdApp;

public partial class MisReservasPage : ContentPage
{
    // Cadena de conexión a MongoDB.
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10%24@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";
    IMongoCollection<ReservaModel> coleccionReservas;

    public MisReservasPage()
    {
        InitializeComponent();

        // Conectar a MongoDB
        var settings = MongoClientSettings.FromConnectionString(conexionMongo);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        var clienteMongo = new MongoClient(settings);
        var baseDeDatos = clienteMongo.GetDatabase("IceColdDB");
        coleccionReservas = baseDeDatos.GetCollection<ReservaModel>("Reservas");
    }

    // Carga las reservas cada vez que se abre la pantalla
    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await CargarMisReservas();
    }

    //Carga las reservas del usuario actual.
    private async Task CargarMisReservas()
    {
        try
        {
            if (SesionGlobal.UsuarioActual == null) return;

            // Busca en MongoDB las reservas del usuario
            var filtro = Builders<ReservaModel>.Filter.Eq(r => r.ClienteEmail, SesionGlobal.UsuarioActual.Email);
            var misReservas = await coleccionReservas.Find(filtro).ToListAsync();

            //Muestra la lista de reservas, si las tiene.
            if (misReservas.Count > 0)
            {
                ListaMisReservas.ItemsSource = misReservas;
                ListaMisReservas.IsVisible = true;
                MensajeVacio.IsVisible = false;
            }
            else
            {
                //Notifica si no hay reservas
                ListaMisReservas.IsVisible = false;
                MensajeVacio.IsVisible = true;
            }
        }
        catch (Exception ex)
        {
            //Notifica error si no se pudo cargar la reserva.
            await DisplayAlert("Error", "No pudimos cargar tus reservas.", "OK");
        }
    }

    //Muestra la información de la reserva.
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

    //Cancela una reserva.
    private async void OnCancelarClicked(object sender, EventArgs e)
    {
        var boton = (Button)sender;
        var reservaSeleccionada = (ReservaModel)boton.CommandParameter;

        //Pide confirmación antes de cancelar.
        bool confirmar = await DisplayAlert("Cancelar Cita", $"¿Estás seguro de que quieres cancelar tu cita para el {reservaSeleccionada.Dia} a las {reservaSeleccionada.Hora}?", "Sí, cancelar", "No, mantener");

        if (confirmar)
        {
            try
            {
                //Borra la reserva en MongoDB.
                var filtroBorrar = Builders<ReservaModel>.Filter.Eq(r => r.Id, reservaSeleccionada.Id);
                await coleccionReservas.DeleteOneAsync(filtroBorrar);

                //Notifica, que la reserva a sido cancelada.
                await DisplayAlert("Cancelada", "Tu reserva ha sido cancelada con éxito.", "OK");

                // Recarga la lista de reservas.
                await CargarMisReservas();
            }
            catch (Exception ex)
            {
                //Notifica error si no se pudo cancelar la reserva.S
                await DisplayAlert("Error", "No se pudo cancelar la reserva.", "OK");
            }
        }
    }
}