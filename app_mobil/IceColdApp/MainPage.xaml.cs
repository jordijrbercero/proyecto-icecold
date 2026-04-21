namespace IceColdApp;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
    }

    // ¡Abre la página de reservas.
    private async void OnReservaClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ReservaPage));
    }

    //Abre la página de mis reservas.
    private async void OnMisReservasClicked(object sender, EventArgs e)
    {
        //Comprueba si el usuario ha iniciado sesión.
        if (SesionGlobal.UsuarioActual == null)
        {
            await DisplayAlert("Atención", "Debes iniciar sesión para ver tus reservas.", "OK");

            await Shell.Current.GoToAsync(nameof(LoginPage));
            return;
        }
        await Shell.Current.GoToAsync(nameof(MisReservasPage));
    }

    //Abre la página de servicios.
    private async void OnServiciosClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ServiciosPage));
    }

    //Abre la web face-id.
    private async void OnAnalizaClicked(object sender, EventArgs e)
    {
        string urlfacial = "https://face-id-barber.vercel.app/";

        try
        {
            Uri uri = new Uri(urlfacial);
            await Launcher.Default.OpenAsync(uri);
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", "No se pudo abrir la página web.", "OK");
        }
    }

    //Abre la página web ice-cold-web.
    private async void OnWebClicked(object sender, EventArgs e)
    {
        string urlweb = "https://ice-cold-web.vercel.app/";

        try
        {
            Uri uri = new Uri(urlweb);
            await Launcher.Default.OpenAsync(uri);
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", "No se pudo abrir la página web.", "OK");
        }
    }

    //Abre la página de contacto.
    private async void OnContactarClicked(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync(nameof(ContactarPage));
    }

    //Carga la foto de perfil al abrir la ventana.
    protected override void OnAppearing()
    {
        base.OnAppearing();

        if (SesionGlobal.UsuarioActual != null && !string.IsNullOrEmpty(SesionGlobal.UsuarioActual.FotoPerfilBase64))
        {
            byte[] bytesImagen = Convert.FromBase64String(SesionGlobal.UsuarioActual.FotoPerfilBase64);
            BotonPerfil.Source = ImageSource.FromStream(() => new MemoryStream(bytesImagen));

            //Ajusta la imagen para que rellene el espacio.
            BotonPerfil.Aspect = Aspect.AspectFill;
        }
        else
        {
            //Muestra la imagen por defecto si no hay foto.
            BotonPerfil.Source = "ic_usuario.png";

            //Ajusta la imagen para que se vea completa.
            BotonPerfil.Aspect = Aspect.AspectFit;
        }
    }

    //Abre la página del perfil o la de login.
    private async void OnPerfilClicked(object sender, EventArgs e)
    {
        //Comprueba si el usuario ha iniciado sesión.
        if (SesionGlobal.UsuarioActual == null)

            await Shell.Current.GoToAsync(nameof(LoginPage));
        else

            await Shell.Current.GoToAsync(nameof(PerfilPage));
    }
}


