using MongoDB.Driver;
using System.Globalization;
using static Microsoft.Maui.ApplicationModel.Permissions;

namespace IceColdApp;

public class Barbero : BindableObject
{
    private bool _isSelected;
    public string Nombre { get; set; }
    public string Imagen { get; set; }

    //Controla si el barbero está seleccionado.
    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            _isSelected = value;
            OnPropertyChanged(nameof(IsSelected));
            OnPropertyChanged(nameof(BordeColor));
            OnPropertyChanged(nameof(FondoColor));
        }
    }

    //Cambia el color del borde según la selección.
    public Color BordeColor => IsSelected ? Color.FromArgb("#29B6F6") : Colors.Transparent;
    //Cambia el color de fondo según la selección.
    public Color FondoColor => IsSelected ? Color.FromArgb("#121A2F") : Color.FromArgb("#1E293B");
}

//Clase para mostrar los días del calendario.
public class DiaCalendario : BindableObject
{
    private bool _isSelected;
    public string Numero { get; set; }
    public bool IsEnabled { get; set; }
    public string NivelDisponibilidad { get; set; }
    public DateTime FechaCompleta { get; set; }

    //Controla si el día está seleccionado.
    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            _isSelected = value;
            OnPropertyChanged(nameof(IsSelected));
            OnPropertyChanged(nameof(BordeColor));
            OnPropertyChanged(nameof(FondoColor));
            OnPropertyChanged(nameof(TextoColor));
        }
    }

    //Cambia el color del texto si el día está disponible.
    public Color TextoColor => !IsEnabled ? Color.FromArgb("#4A5568") : Colors.White;
    //Cambia el color del borde según la selección.
    public Color BordeColor => IsSelected ? Color.FromArgb("#29B6F6") : Colors.Transparent;
    //Cambia el color de fondo según la selección.
    public Color FondoColor => IsSelected ? Color.FromArgb("#29B6F6") : Colors.Transparent;
    //Muestra el nivel de disponibilidad.
    public Color PuntoColor => NivelDisponibilidad == "Alta" ? Color.FromArgb("#4ADE80") : (NivelDisponibilidad == "Media" ? Color.FromArgb("#FBBF24") : Colors.Transparent);
}

public class HoraReserva : BindableObject
{
    private bool _isSelected;
    public string Hora { get; set; }
    public bool IsSelected
    {
        get => _isSelected;
        set
        {
            _isSelected = value;
            OnPropertyChanged(nameof(IsSelected));
            OnPropertyChanged(nameof(BordeColor));
            OnPropertyChanged(nameof(FondoColor));
        }
    }
    //Cambia el color del borde según la selección.
    public Color BordeColor => IsSelected ? Color.FromArgb("#29B6F6") : Colors.Transparent;
    //Cambia el color de fondo según la selección.
    public Color FondoColor => IsSelected ? Color.FromArgb("#121A2F") : Color.FromArgb("#1E293B");
}

public partial class ReservaPage : ContentPage
{
    //Conexión a MongoDB.
    string conexionMongo = "mongodb://jordijrbercero_db_user:L3omessi10$@ac-ogywvuk-shard-00-00.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-01.snxrhd7.mongodb.net:27017,ac-ogywvuk-shard-00-02.snxrhd7.mongodb.net:27017/?ssl=true&replicaSet=atlas-129cbo-shard-0&authSource=admin&appName=IceColdDB";
    IMongoCollection<ReservaModel> coleccionReservas;

    private List<Barbero> todosBarberos;
    private List<DiaCalendario> todosDias;
    private List<HoraReserva> todasHoras;

    private Barbero barberoSeleccionado;
    private DiaCalendario diaSeleccionado;
    private HoraReserva horaSeleccionada;
    private string servicioSeleccionado;

    private DateTime mesVisualizado;

    public ReservaPage()
    {
        InitializeComponent();

        //Se conecta a MongoDB
        var settings = MongoClientSettings.FromConnectionString(conexionMongo);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        var clienteMongo = new MongoClient(settings);
        var baseDeDatos = clienteMongo.GetDatabase("IceColdDB");
        coleccionReservas = baseDeDatos.GetCollection<ReservaModel>("Reservas");

        //Carga los datos fijos.
        CargarDatosFijos();
    }

    //Carga los servicios, barberos y calendario inicial.
    private void CargarDatosFijos()
    {
        PickerServicio.Items.Add("CORTE + LAVADO (16,00 €)");
        PickerServicio.Items.Add("CORTE & ARREGLO DE BARBA (23,00 €)");
        PickerServicio.Items.Add("CORTE NIÑO (15,00 €)");
        PickerServicio.Items.Add("ARREGLO DE BARBA (10,00 €)");
        PickerServicio.Items.Add("DISEÑO / FREESTYLE (Desde 5,00 €)");

        //Guarda la lista de barberos.
        todosBarberos = new List<Barbero>
        {
            new Barbero { Nombre = "Cualquiera", Imagen = "cualquiera.png", IsSelected = true },
            new Barbero { Nombre = "Angelo", Imagen = "barbero1.png" },
            new Barbero { Nombre = "Cristina", Imagen = "barbero2.png" },
            new Barbero { Nombre = "David", Imagen = "barbero3.jpg" }
        };
        barberoSeleccionado = todosBarberos[0];
        BindableLayout.SetItemsSource(ListaBarberos, todosBarberos);

        //Genera el calendario del mes actual.
        mesVisualizado = DateTime.Today;
        GenerarCalendario(mesVisualizado);

        //Muestra las horas disponibles.
        _ = ActualizarHorasDisponibles();
    }

    private void GenerarCalendario(DateTime fechaMes)
    {
        todosDias = new List<DiaCalendario>();

        //Muestra el mes y el año en español.
        CultureInfo culturaEspañol = new CultureInfo("es-ES");
        string nombreMes = fechaMes.ToString("MMMM yyyy", culturaEspañol);
        MesAnioLabel.Text = char.ToUpper(nombreMes[0]) + nombreMes.Substring(1);

        //Guarda el primer día del mes y el número de días.
        DateTime primerDiaDelMes = new DateTime(fechaMes.Year, fechaMes.Month, 1);
        int diasEnMes = DateTime.DaysInMonth(fechaMes.Year, fechaMes.Month);
        
        // Calcula en qué posición empieza el mes.
        int offset = (int)primerDiaDelMes.DayOfWeek - 1;
        if (offset < 0) offset = 6;

        //Añade huecos antes del primer día.
        for (int i = 0; i < offset; i++)
        {
            todosDias.Add(new DiaCalendario { Numero = "", IsEnabled = false });
        }

        //Añade todos los días del mes.
        for (int i = 1; i <= diasEnMes; i++)
        {
            DateTime fechaIteracion = new DateTime(fechaMes.Year, fechaMes.Month, i);

            //Comprueba si el día ya ha pasado o es domingo.
            bool esPasado = fechaIteracion.Date < DateTime.Today;
            bool esDomingo = fechaIteracion.DayOfWeek == DayOfWeek.Sunday;

            bool disponible = !esPasado && !esDomingo;

            todosDias.Add(new DiaCalendario
            {
                Numero = i.ToString(),
                IsEnabled = disponible,
                FechaCompleta = fechaIteracion,
                NivelDisponibilidad = disponible ? "Alta" : "Ninguna"
            });
        }

        //Muestra los días.
        BindableLayout.SetItemsSource(ContenedorDias, todosDias);
    }

    //Muestra el mes anterior.
    private async void OnMesAnteriorTapped(object sender, TappedEventArgs e)
    {
        if (mesVisualizado.Year == DateTime.Today.Year && mesVisualizado.Month == DateTime.Today.Month)
            return;

        mesVisualizado = mesVisualizado.AddMonths(-1);
        GenerarCalendario(mesVisualizado);

        //Borra el día seleccionado y actualiza las horas.
        diaSeleccionado = null;
        await ActualizarHorasDisponibles();
    }

    //Muestra el mes siguiente.
    private async void OnMesSiguienteTapped(object sender, TappedEventArgs e)
    {
        mesVisualizado = mesVisualizado.AddMonths(1);
        GenerarCalendario(mesVisualizado);

        //Borra el día seleccionado y actualiza las horas.
        diaSeleccionado = null;
        await ActualizarHorasDisponibles();
    }

    //Actualiza las horas disponibles.
    private async Task ActualizarHorasDisponibles()
    {
        if (barberoSeleccionado == null || diaSeleccionado == null)
        {
            BindableLayout.SetItemsSource(ListaHoras, new List<HoraReserva>());
            return;
        }

        //Crea la lista base de horas.
        var horasBase = new List<HoraReserva>();
        TimeSpan horaActual = new TimeSpan(9, 0, 0);
        TimeSpan horaFin = new TimeSpan(20, 0, 0);

        while (horaActual <= horaFin)
        {
            horasBase.Add(new HoraReserva { Hora = horaActual.ToString(@"hh\:mm") });
            horaActual = horaActual.Add(TimeSpan.FromMinutes(30));
        }

        try
        {
            //Guarda la fecha seleccionada con formato de texto.
            string diaFormateado = diaSeleccionado.FechaCompleta.ToString("dd/MM/yyyy");

            //Busca las reservas de ese barbero y de ese día.
            var filtro = Builders<ReservaModel>.Filter.And(
                Builders<ReservaModel>.Filter.Eq(r => r.Barbero, barberoSeleccionado.Nombre),
                Builders<ReservaModel>.Filter.Eq(r => r.Dia, diaFormateado)
            );

            var reservasExistentes = await coleccionReservas.Find(filtro).ToListAsync();

            //Quita las horas que ya están ocupadas.
            var horasOcupadas = reservasExistentes.Select(r => r.Hora).ToList();
            todasHoras = horasBase.Where(h => !horasOcupadas.Contains(h.Hora)).ToList();

            BindableLayout.SetItemsSource(ListaHoras, todasHoras);
            horaSeleccionada = null;
        }
        catch (Exception ex)
        {
            //Si falla la consulta, muestra todas las horas.
            BindableLayout.SetItemsSource(ListaHoras, horasBase);
        }
    }

    //Cambia el servicio seleccionado.
    private void OnServicioChanged(object sender, EventArgs e)
    {
        if (PickerServicio.SelectedIndex != -1)
        {
            servicioSeleccionado = PickerServicio.Items[PickerServicio.SelectedIndex];

            //Muestra el resumen según el servicio elegido.
            if (servicioSeleccionado.Contains("LAVADO"))
            {
                ResumenServicio.Text = "Corte + Lavado • 40min"; ResumenPrecio.Text = "16,00 €";
            }
            else if (servicioSeleccionado.Contains("CORTE & ARREGLO"))
            {
                ResumenServicio.Text = "Corte & Barba • 1h"; ResumenPrecio.Text = "23,00 €";
            }
            else if (servicioSeleccionado.Contains("NIÑO"))
            {
                ResumenServicio.Text = "Corte Niño • 40min"; ResumenPrecio.Text = "15,00 €";
            }
            else if (servicioSeleccionado.Contains("ARREGLO DE BARBA"))
            {
                ResumenServicio.Text = "Arreglo Barba • 30min"; ResumenPrecio.Text = "10,00 €";
            }
            else if (servicioSeleccionado.Contains("FREESTYLE"))
            {
                ResumenServicio.Text = "Freestyle • 15min"; ResumenPrecio.Text = "5,00 €";
            }
        }
    }

    //Selecciona un barbero.
    private async void OnBarberoTapped(object sender, TappedEventArgs e)
    {
        var elementoTocado = (VisualElement)sender;
        var barbero = (Barbero)elementoTocado.BindingContext;

        foreach (var b in todosBarberos) b.IsSelected = false;
        barbero.IsSelected = true;
        barberoSeleccionado = barbero;

        await ActualizarHorasDisponibles();
    }

    //Selecciona un día.
    private async void OnDiaTapped(object sender, TappedEventArgs e)
    {
        var elementoTocado = (VisualElement)sender;
        var dia = (DiaCalendario)elementoTocado.BindingContext;

        if (!dia.IsEnabled || string.IsNullOrEmpty(dia.Numero)) return;

        foreach (var d in todosDias) d.IsSelected = false;
        dia.IsSelected = true;
        diaSeleccionado = dia;

        await ActualizarHorasDisponibles();
    }

    //Selecciona una hora.
    private void OnHoraTapped(object sender, TappedEventArgs e)
    {
        var elementoTocado = (VisualElement)sender;
        var hora = (HoraReserva)elementoTocado.BindingContext;

        foreach (var h in todasHoras) h.IsSelected = false;
        hora.IsSelected = true;
        horaSeleccionada = hora;
    }

    //Guarda la reserva.
    private async void OnContinuarClicked(object sender, EventArgs e)
    {
        if (SesionGlobal.UsuarioActual == null)
        {
            await DisplayAlert("Atención", "Para hacer una reserva debes iniciar sesión o registrarte primero.", "OK");
            await Shell.Current.GoToAsync(nameof(LoginPage));
            return;
        }

        //Comprueba que todos los datos estén completos.
        if (string.IsNullOrEmpty(servicioSeleccionado) || barberoSeleccionado == null || diaSeleccionado == null || horaSeleccionada == null)
        {
            await DisplayAlert("Faltan datos", "Por favor, selecciona el servicio, barbero, día y hora para continuar.", "OK");
            return;
        }

        try
        {
            await DisplayAlert("Procesando", "Estamos guardando tu cita...", "OK");

            var nuevaReserva = new ReservaModel
            {
                //Crea la nueva reserva.
                ClienteNombre = SesionGlobal.UsuarioActual.Nombre,
                ClienteEmail = SesionGlobal.UsuarioActual.Email,
                Servicio = servicioSeleccionado,
                Barbero = barberoSeleccionado.Nombre,
                Dia = diaSeleccionado.FechaCompleta.ToString("dd/MM/yyyy"),
                Hora = horaSeleccionada.Hora,
                Precio = ResumenPrecio.Text,
                FechaCreacion = DateTime.Now,
                email_confirmacion_enviado = false,
                recordatorio_enviado = false
            };

            //Guarda la reserva en MongoDB.
            await coleccionReservas.InsertOneAsync(nuevaReserva);

            await DisplayAlert("¡Reserva Confirmada!", $"Tu cita con {barberoSeleccionado.Nombre} ha sido guardada con éxito.", "Genial");

            //Abre la página de mis reservas.
            await Shell.Current.GoToAsync($"../{nameof(MisReservasPage)}");
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", $"No se pudo guardar la reserva: {ex.Message}", "OK");
        }
    }
}