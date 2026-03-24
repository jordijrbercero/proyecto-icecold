namespace IceColdApp;

public partial class PerfilPage : ContentPage
{
    public PerfilPage()
    {
        InitializeComponent();

        
        if (SesionGlobal.UsuarioActual != null)
        {
            NombreLabel.Text = SesionGlobal.UsuarioActual.Nombre;
            EmailLabel.Text = SesionGlobal.UsuarioActual.Email;
        }
    }

    private async void OnCerrarSesionClicked(object sender, EventArgs e)
    {
       
        SesionGlobal.UsuarioActual = null;

        
        await Shell.Current.GoToAsync("..");
    }
}