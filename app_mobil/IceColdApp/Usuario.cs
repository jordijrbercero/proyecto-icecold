using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace IceColdApp;

public class Usuario
{
    
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Nombre { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public string FotoPerfilBase64 { get; set; }

}