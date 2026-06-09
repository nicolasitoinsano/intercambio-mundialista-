const fs = require('fs');

const teamList = [
  // Grupo A
  ["México", "🇲🇽", [
    {name:"G. Ochoa", pos:"POR", num:13, matches:150, goals:0, isRare:true, age:38, club:"Salernitana", foot:"Diestro"},
    {name:"H. Lozano", pos:"DEL", num:22, matches:70, goals:18, isRare:false, age:28, club:"PSV", foot:"Diestro"},
    {name:"E. Álvarez", pos:"MED", num:4, matches:75, goals:5, isRare:false, age:26, club:"West Ham", foot:"Diestro"}
  ]],
  ["Sudáfrica", "🇿🇦", [
    {name:"P. Tau", pos:"DEL", num:10, matches:41, goals:14, isRare:true, age:29, club:"Al Ahly", foot:"Zurdo"},
    {name:"T. Zwane", pos:"MED", num:11, matches:40, goals:8, isRare:false, age:34, club:"Mamelodi Sundowns", foot:"Diestro"},
    {name:"R. Williams", pos:"POR", num:1, matches:38, goals:0, isRare:false, age:32, club:"Mamelodi Sundowns", foot:"Diestro"}
  ]],
  ["Corea del Sur", "🇰🇷", [
    {name:"H. Son", pos:"DEL", num:7, matches:117, goals:41, isRare:true, age:31, club:"Tottenham", foot:"Ambidextro"},
    {name:"H. Hwang", pos:"DEL", num:11, matches:59, goals:12, isRare:false, age:28, club:"Wolves", foot:"Diestro"},
    {name:"K. Lee", pos:"MED", num:18, matches:20, goals:4, isRare:false, age:23, club:"PSG", foot:"Zurdo"}
  ]],
  ["Chequia", "🇨🇿", [
    {name:"T. Souček", pos:"MED", num:22, matches:68, goals:12, isRare:true, age:29, club:"West Ham", foot:"Diestro"},
    {name:"P. Schick", pos:"DEL", num:10, matches:38, goals:18, isRare:true, age:28, club:"B. Leverkusen", foot:"Zurdo"},
    {name:"A. Hložek", pos:"DEL", num:20, matches:30, goals:2, isRare:false, age:21, club:"B. Leverkusen", foot:"Diestro"}
  ]],

  // Grupo B
  ["Canadá", "🇨🇦", [
    {name:"A. Davies", pos:"DEF", num:19, matches:44, goals:15, isRare:true, age:23, club:"Bayern Munich", foot:"Zurdo"},
    {name:"J. David", pos:"DEL", num:20, matches:45, goals:26, isRare:false, age:24, club:"Lille", foot:"Diestro"},
    {name:"T. Buchanan", pos:"MED", num:17, matches:35, goals:4, isRare:false, age:25, club:"Inter Milan", foot:"Diestro"}
  ]],
  ["Suiza", "🇨🇭", [
    {name:"G. Xhaka", pos:"MED", num:10, matches:121, goals:14, isRare:true, age:31, club:"B. Leverkusen", foot:"Zurdo"},
    {name:"Y. Sommer", pos:"POR", num:1, matches:89, goals:0, isRare:false, age:35, club:"Inter Milan", foot:"Diestro"},
    {name:"M. Akanji", pos:"DEF", num:5, matches:57, goals:2, isRare:false, age:28, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Catar", "🇶🇦", [
    {name:"A. Afif", pos:"DEL", num:11, matches:96, goals:29, isRare:true, age:27, club:"Al Sadd", foot:"Diestro"},
    {name:"H. Al-Haydos", pos:"MED", num:10, matches:175, goals:38, isRare:false, age:33, club:"Al Sadd", foot:"Diestro"},
    {name:"A. Ali", pos:"DEL", num:19, matches:102, goals:42, isRare:false, age:27, club:"Al Duhail", foot:"Diestro"}
  ]],
  ["Bosnia y Herzegovina", "🇧🇦", [
    {name:"E. Džeko", pos:"DEL", num:11, matches:133, goals:65, isRare:true, age:38, club:"Fenerbahce", foot:"Diestro"},
    {name:"M. Pjanić", pos:"MED", num:10, matches:115, goals:18, isRare:false, age:34, club:"Sharjah FC", foot:"Diestro"},
    {name:"S. Kolašinac", pos:"DEF", num:3, matches:57, goals:0, isRare:false, age:30, club:"Atalanta", foot:"Zurdo"}
  ]],

  // Grupo C
  ["Brasil", "🇧🇷", [
    {name:"Vinícius Jr.", pos:"DEL", num:7, matches:26, goals:3, isRare:true, age:23, club:"Real Madrid", foot:"Diestro"},
    {name:"Alisson", pos:"POR", num:1, matches:63, goals:0, isRare:false, age:31, club:"Liverpool", foot:"Diestro"},
    {name:"Rodrygo", pos:"DEL", num:11, matches:20, goals:4, isRare:false, age:23, club:"Real Madrid", foot:"Diestro"}
  ]],
  ["Marruecos", "🇲🇦", [
    {name:"A. Hakimi", pos:"DEF", num:2, matches:70, goals:9, isRare:true, age:25, club:"PSG", foot:"Diestro"},
    {name:"H. Ziyech", pos:"DEL", num:7, matches:59, goals:22, isRare:true, age:31, club:"Galatasaray", foot:"Zurdo"},
    {name:"Y. Bono", pos:"POR", num:1, matches:62, goals:0, isRare:false, age:33, club:"Al Hilal", foot:"Zurdo"}
  ]],
  ["Haití", "🇭🇹", [
    {name:"F. Pierrot", pos:"DEL", num:9, matches:30, goals:21, isRare:true, age:29, club:"Maccabi Haifa", foot:"Diestro"},
    {name:"D. Nazon", pos:"DEL", num:10, matches:52, goals:28, isRare:false, age:30, club:"Kayserispor", foot:"Diestro"},
    {name:"C. Arcus", pos:"DEF", num:2, matches:32, goals:1, isRare:false, age:28, club:"Vitesse", foot:"Diestro"}
  ]],
  ["Escocia", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", [
    {name:"A. Robertson", pos:"DEF", num:3, matches:68, goals:3, isRare:true, age:30, club:"Liverpool", foot:"Zurdo"},
    {name:"S. McTominay", pos:"MED", num:4, matches:49, goals:8, isRare:true, age:27, club:"Manchester Utd", foot:"Diestro"},
    {name:"J. McGinn", pos:"MED", num:7, matches:62, goals:18, isRare:false, age:29, club:"Aston Villa", foot:"Zurdo"}
  ]],

  // Grupo D
  ["Estados Unidos", "🇺🇸", [
    {name:"C. Pulisic", pos:"DEL", num:10, matches:64, goals:28, isRare:true, age:25, club:"AC Milan", foot:"Diestro"},
    {name:"C. McKennie", pos:"MED", num:8, matches:49, goals:11, isRare:false, age:25, club:"Juventus", foot:"Diestro"},
    {name:"G. Reyna", pos:"MED", num:7, matches:24, goals:7, isRare:false, age:21, club:"Nott. Forest", foot:"Diestro"}
  ]],
  ["Paraguay", "🇵🇾", [
    {name:"M. Almirón", pos:"DEL", num:10, matches:54, goals:7, isRare:true, age:30, club:"Newcastle", foot:"Zurdo"},
    {name:"J. Enciso", pos:"DEL", num:19, matches:15, goals:1, isRare:true, age:20, club:"Brighton", foot:"Diestro"},
    {name:"G. Gómez", pos:"DEF", num:15, matches:70, goals:4, isRare:false, age:31, club:"Palmeiras", foot:"Diestro"}
  ]],
  ["Australia", "🇦🇺", [
    {name:"M. Ryan", pos:"POR", num:1, matches:86, goals:0, isRare:false, age:32, club:"AZ Alkmaar", foot:"Diestro"},
    {name:"H. Souttar", pos:"DEF", num:19, matches:22, goals:10, isRare:false, age:25, club:"Leicester City", foot:"Diestro"},
    {name:"C. Goodwin", pos:"MED", num:23, matches:25, goals:6, isRare:false, age:32, club:"Al Wehda", foot:"Zurdo"}
  ]],
  ["Turquía", "🇹🇷", [
    {name:"H. Çalhanoğlu", pos:"MED", num:10, matches:84, goals:18, isRare:true, age:30, club:"Inter Milan", foot:"Diestro"},
    {name:"A. Güler", pos:"MED", num:8, matches:10, goals:1, isRare:true, age:19, club:"Real Madrid", foot:"Zurdo"},
    {name:"B. Yılmaz", pos:"DEL", num:17, matches:15, goals:2, isRare:false, age:23, club:"Galatasaray", foot:"Diestro"}
  ]],

  // Grupo E
  ["Alemania", "🇩🇪", [
    {name:"M. Neuer", pos:"POR", num:1, matches:117, goals:0, isRare:true, age:38, club:"Bayern Munich", foot:"Diestro"},
    {name:"J. Musiala", pos:"MED", num:14, matches:25, goals:2, isRare:true, age:21, club:"Bayern Munich", foot:"Diestro"},
    {name:"K. Havertz", pos:"DEL", num:7, matches:42, goals:14, isRare:false, age:24, club:"Arsenal", foot:"Zurdo"}
  ]],
  ["Curazao", "🇨🇼", [
    {name:"J. Bacuna", pos:"MED", num:7, matches:30, goals:5, isRare:true, age:26, club:"Birmingham City", foot:"Diestro"},
    {name:"L. Bacuna", pos:"DEF", num:5, matches:46, goals:5, isRare:false, age:32, club:"Groningen", foot:"Diestro"},
    {name:"E. Room", pos:"POR", num:1, matches:43, goals:0, isRare:false, age:35, club:"Vitesse", foot:"Diestro"}
  ]],
  ["Costa de Marfil", "🇨🇮", [
    {name:"S. Haller", pos:"DEL", num:22, matches:25, goals:8, isRare:true, age:29, club:"B. Dortmund", foot:"Diestro"},
    {name:"F. Kessié", pos:"MED", num:8, matches:69, goals:9, isRare:true, age:27, club:"Al Ahli", foot:"Diestro"},
    {name:"O. Kossounou", pos:"DEF", num:7, matches:24, goals:0, isRare:false, age:23, club:"B. Leverkusen", foot:"Diestro"}
  ]],
  ["Ecuador", "🇪🇨", [
    {name:"M. Caicedo", pos:"MED", num:23, matches:38, goals:3, isRare:true, age:22, club:"Chelsea", foot:"Diestro"},
    {name:"E. Valencia", pos:"DEL", num:13, matches:83, goals:40, isRare:true, age:34, club:"Internacional", foot:"Diestro"},
    {name:"P. Hincapié", pos:"DEF", num:3, matches:31, goals:1, isRare:false, age:22, club:"B. Leverkusen", foot:"Zurdo"}
  ]],

  // Grupo F
  ["Países Bajos", "🇳🇱", [
    {name:"V. van Dijk", pos:"DEF", num:4, matches:64, goals:7, isRare:true, age:32, club:"Liverpool", foot:"Diestro"},
    {name:"F. de Jong", pos:"MED", num:21, matches:54, goals:2, isRare:false, age:26, club:"FC Barcelona", foot:"Diestro"},
    {name:"M. de Ligt", pos:"DEF", num:3, matches:43, goals:2, isRare:false, age:24, club:"Bayern Munich", foot:"Diestro"}
  ]],
  ["Japón", "🇯🇵", [
    {name:"T. Kubo", pos:"MED", num:20, matches:31, goals:3, isRare:true, age:22, club:"Real Sociedad", foot:"Zurdo"},
    {name:"W. Endo", pos:"MED", num:6, matches:57, goals:3, isRare:false, age:31, club:"Liverpool", foot:"Diestro"},
    {name:"K. Mitoma", pos:"DEL", num:7, matches:20, goals:7, isRare:true, age:27, club:"Brighton", foot:"Diestro"}
  ]],
  ["Túnez", "🇹🇳", [
    {name:"E. Skhiri", pos:"MED", num:17, matches:60, goals:3, isRare:false, age:29, club:"E. Frankfurt", foot:"Diestro"},
    {name:"Y. Msakni", pos:"MED", num:7, matches:97, goals:21, isRare:true, age:33, club:"Al Arabi", foot:"Diestro"},
    {name:"A. Laïdouni", pos:"MED", num:14, matches:40, goals:2, isRare:false, age:27, club:"Union Berlin", foot:"Diestro"}
  ]],
  ["Suecia", "🇸🇪", [
    {name:"A. Isak", pos:"DEL", num:14, matches:42, goals:10, isRare:true, age:24, club:"Newcastle", foot:"Diestro"},
    {name:"V. Lindelöf", pos:"DEF", num:3, matches:64, goals:3, isRare:false, age:29, club:"Manchester Utd", foot:"Diestro"},
    {name:"D. Kulusevski", pos:"MED", num:21, matches:37, goals:3, isRare:true, age:24, club:"Tottenham", foot:"Zurdo"}
  ]],

  // Grupo G
  ["Bélgica", "🇧🇪", [
    {name:"K. De Bruyne", pos:"MED", num:7, matches:99, goals:26, isRare:true, age:32, club:"Manchester City", foot:"Diestro"},
    {name:"R. Lukaku", pos:"DEL", num:10, matches:113, goals:83, isRare:true, age:31, club:"AS Roma", foot:"Zurdo"},
    {name:"J. Doku", pos:"DEL", num:11, matches:20, goals:2, isRare:false, age:22, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Egipto", "🇪🇬", [
    {name:"M. Salah", pos:"DEL", num:10, matches:96, goals:54, isRare:true, age:31, club:"Liverpool", foot:"Zurdo"},
    {name:"M. Elneny", pos:"MED", num:17, matches:97, goals:8, isRare:false, age:31, club:"Arsenal", foot:"Diestro"},
    {name:"O. Marmoush", pos:"DEL", num:22, matches:29, goals:5, isRare:false, age:25, club:"E. Frankfurt", foot:"Diestro"}
  ]],
  ["Irán", "🇮🇷", [
    {name:"M. Taremi", pos:"DEL", num:9, matches:76, goals:42, isRare:true, age:31, club:"FC Porto", foot:"Diestro"},
    {name:"S. Azmoun", pos:"DEL", num:20, matches:75, goals:49, isRare:false, age:29, club:"AS Roma", foot:"Diestro"},
    {name:"A. Jahanbakhsh", pos:"MED", num:7, matches:77, goals:15, isRare:false, age:30, club:"Feyenoord", foot:"Diestro"}
  ]],
  ["Nueva Zelanda", "🇳🇿", [
    {name:"C. Wood", pos:"DEL", num:9, matches:74, goals:34, isRare:true, age:32, club:"Nott. Forest", foot:"Diestro"},
    {name:"L. Cacace", pos:"DEF", num:13, matches:23, goals:1, isRare:false, age:23, club:"Empoli", foot:"Zurdo"},
    {name:"M. Garbett", pos:"MED", num:10, matches:20, goals:3, isRare:false, age:22, club:"NAC Breda", foot:"Diestro"}
  ]],

  // Grupo H
  ["España", "🇪🇸", [
    {name:"Rodri", pos:"MED", num:16, matches:48, goals:1, isRare:true, age:27, club:"Manchester City", foot:"Diestro"},
    {name:"Pedri", pos:"MED", num:20, matches:18, goals:0, isRare:true, age:21, club:"FC Barcelona", foot:"Diestro"},
    {name:"Lamine Yamal", pos:"DEL", num:19, matches:14, goals:3, isRare:true, age:16, club:"FC Barcelona", foot:"Zurdo"}
  ]],
  ["Cabo Verde", "🇨🇻", [
    {name:"Ryan Mendes", pos:"DEL", num:20, matches:68, goals:16, isRare:true, age:34, club:"Karagumruk", foot:"Diestro"},
    {name:"Garry Rodrigues", pos:"DEL", num:11, matches:48, goals:8, isRare:false, age:33, club:"Ankaragucu", foot:"Diestro"},
    {name:"Bebé", pos:"DEL", num:10, matches:25, goals:6, isRare:false, age:33, club:"Rayo Vallecano", foot:"Diestro"}
  ]],
  ["Arabia Saudita", "🇸🇦", [
    {name:"S. Al-Dawsari", pos:"MED", num:10, matches:79, goals:22, isRare:true, age:32, club:"Al Hilal", foot:"Diestro"},
    {name:"F. Al-Muwallad", pos:"MED", num:18, matches:74, goals:17, isRare:false, age:29, club:"Al Shabab", foot:"Diestro"},
    {name:"M. Kanno", pos:"MED", num:8, matches:45, goals:2, isRare:false, age:29, club:"Al Hilal", foot:"Diestro"}
  ]],
  ["Uruguay", "🇺🇾", [
    {name:"F. Valverde", pos:"MED", num:15, matches:55, goals:6, isRare:true, age:25, club:"Real Madrid", foot:"Diestro"},
    {name:"D. Núñez", pos:"DEL", num:9, matches:22, goals:8, isRare:false, age:24, club:"Liverpool", foot:"Diestro"},
    {name:"R. Araújo", pos:"DEF", num:4, matches:16, goals:1, isRare:true, age:25, club:"FC Barcelona", foot:"Diestro"}
  ]],

  // Grupo I
  ["Francia", "🇫🇷", [
    {name:"K. Mbappé", pos:"DEL", num:10, matches:75, goals:46, isRare:true, age:25, club:"Real Madrid", foot:"Diestro"},
    {name:"A. Griezmann", pos:"MED", num:7, matches:127, goals:44, isRare:true, age:33, club:"Atlético Madrid", foot:"Zurdo"},
    {name:"O. Dembélé", pos:"DEL", num:11, matches:43, goals:5, isRare:false, age:27, club:"PSG", foot:"Ambidextro"}
  ]],
  ["Senegal", "🇸🇳", [
    {name:"S. Mané", pos:"DEL", num:10, matches:101, goals:40, isRare:true, age:32, club:"Al Nassr", foot:"Diestro"},
    {name:"E. Mendy", pos:"POR", num:16, matches:33, goals:0, isRare:false, age:32, club:"Al Ahli", foot:"Diestro"},
    {name:"K. Koulibaly", pos:"DEF", num:3, matches:75, goals:1, isRare:true, age:32, club:"Al Hilal", foot:"Diestro"}
  ]],
  ["Noruega", "🇳🇴", [
    {name:"E. Haaland", pos:"DEL", num:9, matches:29, goals:27, isRare:true, age:23, club:"Manchester City", foot:"Zurdo"},
    {name:"M. Ødegaard", pos:"MED", num:10, matches:55, goals:3, isRare:true, age:25, club:"Arsenal", foot:"Zurdo"},
    {name:"A. Sørloth", pos:"DEL", num:19, matches:51, goals:17, isRare:false, age:28, club:"Villarreal", foot:"Zurdo"}
  ]],
  ["Irak", "🇮🇶", [
    {name:"A. Hussein", pos:"DEL", num:18, matches:72, goals:22, isRare:true, age:28, club:"Al-Quwa Al-Jawiya", foot:"Diestro"},
    {name:"M. Ali", pos:"DEL", num:10, matches:42, goals:19, isRare:false, age:23, club:"Al-Shorta", foot:"Diestro"},
    {name:"J. Iqbal", pos:"MED", num:14, matches:10, goals:1, isRare:false, age:21, club:"Utrecht", foot:"Diestro"}
  ]],

  // Grupo J
  ["Argentina", "🇦🇷", [
    {name:"L. Messi", pos:"DEL", num:10, matches:180, goals:106, isRare:true, age:36, club:"Inter Miami CF", foot:"Zurdo"},
    {name:"E. Martínez", pos:"POR", num:23, matches:36, goals:0, isRare:false, age:31, club:"Aston Villa", foot:"Diestro"},
    {name:"J. Álvarez", pos:"DEL", num:9, matches:28, goals:7, isRare:false, age:24, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Argelia", "🇩🇿", [
    {name:"R. Mahrez", pos:"MED", num:7, matches:89, goals:30, isRare:true, age:33, club:"Al Ahli", foot:"Zurdo"},
    {name:"I. Bennacer", pos:"MED", num:22, matches:48, goals:2, isRare:true, age:26, club:"AC Milan", foot:"Zurdo"},
    {name:"S. Feghouli", pos:"MED", num:10, matches:82, goals:20, isRare:false, age:34, club:"Karagumruk", foot:"Diestro"}
  ]],
  ["Austria", "🇦🇹", [
    {name:"D. Alaba", pos:"DEF", num:8, matches:105, goals:15, isRare:true, age:31, club:"Real Madrid", foot:"Zurdo"},
    {name:"M. Sabitzer", pos:"MED", num:9, matches:78, goals:17, isRare:true, age:30, club:"B. Dortmund", foot:"Diestro"},
    {name:"K. Laimer", pos:"MED", num:20, matches:32, goals:4, isRare:false, age:27, club:"Bayern Munich", foot:"Diestro"}
  ]],
  ["Jordania", "🇯🇴", [
    {name:"M. Al-Taamari", pos:"DEL", num:10, matches:64, goals:18, isRare:true, age:26, club:"Montpellier", foot:"Zurdo"},
    {name:"Y. Al-Naimat", pos:"DEL", num:11, matches:40, goals:16, isRare:false, age:24, club:"Al-Ahli", foot:"Diestro"},
    {name:"B. Faisal", pos:"DEL", num:9, matches:53, goals:15, isRare:false, age:28, club:"Al-Wehdat", foot:"Diestro"}
  ]],

  // Grupo K
  ["Portugal", "🇵🇹", [
    {name:"C. Ronaldo", pos:"DEL", num:7, matches:205, goals:128, isRare:true, age:39, club:"Al Nassr", foot:"Diestro"},
    {name:"B. Fernandes", pos:"MED", num:8, matches:63, goals:19, isRare:false, age:29, club:"Manchester Utd", foot:"Diestro"},
    {name:"R. Leão", pos:"DEL", num:17, matches:24, goals:4, isRare:true, age:24, club:"AC Milan", foot:"Diestro"}
  ]],
  ["Uzbekistán", "🇺🇿", [
    {name:"E. Shomurodov", pos:"DEL", num:14, matches:69, goals:38, isRare:true, age:28, club:"Cagliari", foot:"Diestro"},
    {name:"O. Shukurov", pos:"MED", num:7, matches:58, goals:4, isRare:false, age:27, club:"Fatih Karagumruk", foot:"Diestro"},
    {name:"J. Masharipov", pos:"MED", num:10, matches:55, goals:10, isRare:false, age:30, club:"Panserraikos", foot:"Diestro"}
  ]],
  ["Colombia", "🇨🇴", [
    {name:"L. Díaz", pos:"DEL", num:7, matches:45, goals:11, isRare:true, age:27, club:"Liverpool", foot:"Diestro"},
    {name:"J. Rodríguez", pos:"MED", num:10, matches:96, goals:27, isRare:true, age:32, club:"São Paulo", foot:"Zurdo"},
    {name:"J. Arias", pos:"MED", num:11, matches:15, goals:1, isRare:false, age:26, club:"Fluminense", foot:"Diestro"}
  ]],
  ["RD Congo", "🇨🇩", [
    {name:"C. Bakambu", pos:"DEL", num:9, matches:54, goals:16, isRare:true, age:33, club:"Real Betis", foot:"Diestro"},
    {name:"Chancel Mbemba", pos:"DEF", num:22, matches:75, goals:5, isRare:true, age:29, club:"Marseille", foot:"Diestro"},
    {name:"Yoane Wissa", pos:"DEL", num:20, matches:22, goals:5, isRare:false, age:27, club:"Brentford", foot:"Diestro"}
  ]],

  // Grupo L
  ["Inglaterra", "🏴%e2%80%8d%e2%9e%a1%ef%b8%8f", [ // england flag
    {name:"H. Kane", pos:"DEL", num:9, matches:89, goals:62, isRare:true, age:30, club:"Bayern Munich", foot:"Diestro"},
    {name:"J. Bellingham", pos:"MED", num:10, matches:27, goals:2, isRare:true, age:20, club:"Real Madrid", foot:"Diestro"},
    {name:"B. Saka", pos:"DEL", num:7, matches:32, goals:11, isRare:false, age:22, club:"Arsenal", foot:"Zurdo"}
  ]],
  ["Croacia", "🇭🇷", [
    {name:"L. Modrić", pos:"MED", num:10, matches:172, goals:24, isRare:true, age:38, club:"Real Madrid", foot:"Diestro"},
    {name:"M. Kovačić", pos:"MED", num:8, matches:97, goals:5, isRare:false, age:30, club:"Manchester City", foot:"Diestro"},
    {name:"J. Gvardiol", pos:"DEF", num:20, matches:27, goals:2, isRare:true, age:22, club:"Manchester City", foot:"Zurdo"}
  ]],
  ["Ghana", "🇬🇭", [
    {name:"M. Kudus", pos:"MED", num:20, matches:30, goals:9, isRare:true, age:23, club:"West Ham", foot:"Zurdo"},
    {name:"I. Williams", pos:"DEL", num:9, matches:15, goals:1, isRare:true, age:29, club:"Athletic Bilbao", foot:"Diestro"},
    {name:"Jordan Ayew", pos:"DEL", num:19, matches:96, goals:22, isRare:false, age:32, club:"Crystal Palace", foot:"Diestro"}
  ]],
  ["Panamá", "🇵🇦", [
    {name:"A. Carrasquilla", pos:"MED", num:8, matches:55, goals:2, isRare:true, age:25, club:"Houston Dynamo", foot:"Diestro"},
    {name:"E. Bárcenas", pos:"DEL", num:10, matches:80, goals:8, isRare:false, age:30, club:"Mazatlan", foot:"Diestro"},
    {name:"J. Fajardo", pos:"DEL", num:17, matches:42, goals:9, isRare:false, age:30, club:"Universidad Catolica", foot:"Diestro"}
  ]]
];

// Note: England flag correction
teamList[44][1] = "🏴󠁧󠁢󠁥󠁮󠁧󠁿";

const generatedGroups = [];
for (let i = 0; i < 12; i++) {
  const groupName = `Grupo ${String.fromCharCode(65 + i)}`;
  const teams = [];
  for (let j = 0; j < 4; j++) {
    const teamData = teamList[i * 4 + j];
    if (!teamData) continue;
    const players = teamData[2].map((p, idx) => ({
      id: i * 12 + j * 3 + idx + 1,
      name: p.name,
      pos: p.pos,
      num: p.num,
      matches: p.matches,
      goals: p.goals,
      isRare: p.isRare,
      age: p.age,
      club: p.club,
      foot: p.foot
    }));
    teams.push({ country: teamData[0], flag: teamData[1], players });
  }
  generatedGroups.push({ groupName, teams });
}

let fileContent = fs.readFileSync('src/data.js', 'utf-8');
const startIdx = fileContent.indexOf('export const teamList');
const endIdx = fileContent.indexOf('export const venuesData');

if (startIdx !== -1 && endIdx !== -1) {
    let newContent = fileContent.substring(0, startIdx);
    newContent += "export const teamList = " + JSON.stringify(teamList, null, 2) + ";\n\n";
    newContent += "export const albumGroups = " + JSON.stringify(generatedGroups, null, 2) + ";\n\n";
    newContent += fileContent.substring(endIdx);
    fs.writeFileSync('src/data.js', newContent);
    console.log("Data updated successfully!");
} else {
    console.log("Could not find insertion points.");
}
