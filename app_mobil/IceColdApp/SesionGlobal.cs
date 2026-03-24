using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceColdApp;

public static class SesionGlobal
{
    // Esta variable guardará al usuario que haya iniciado sesión
    public static Usuario UsuarioActual { get; set; }
}
