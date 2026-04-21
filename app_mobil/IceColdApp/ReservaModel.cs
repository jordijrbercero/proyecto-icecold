using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace IceColdApp;

public class ReservaModel
{
    //Id único de la reserva en MongoDB.
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    //Datos del cliente.
    public string ClienteNombre { get; set; }
    public string ClienteEmail { get; set; }

    //Datos de la reserva.
    public string Servicio { get; set; }
    public string Barbero { get; set; }
    public string Dia { get; set; }
    public string Hora { get; set; }
    public string Precio { get; set; }
    public DateTime FechaCreacion { get; set; }

    //Controla si se han enviado los correos.
    public bool email_confirmacion_enviado { get; set; }
    public bool recordatorio_enviado { get; set; }


}