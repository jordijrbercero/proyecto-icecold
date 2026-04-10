using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace IceColdApp;

public class ReservaModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    
    public string ClienteNombre { get; set; }
    public string ClienteEmail { get; set; }

    
    public string Servicio { get; set; }
    public string Barbero { get; set; }
    public string Dia { get; set; }
    public string Hora { get; set; }
    public string Precio { get; set; }
    public DateTime FechaCreacion { get; set; }
}