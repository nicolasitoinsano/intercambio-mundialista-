const fs = require('fs');

const teamList = [
  ["México", "🇲🇽", [
    {name:"G. Ochoa", pos:"POR", num:13, matches:150, goals:0, isRare:true, age:38, club:"Salernitana", foot:"Diestro"},
    {name:"H. Lozano", pos:"DEL", num:22, matches:70, goals:18, isRare:false, age:28, club:"PSV", foot:"Diestro"},
    {name:"E. Álvarez", pos:"MED", num:4, matches:75, goals:5, isRare:false, age:26, club:"West Ham", foot:"Diestro"}
  ]],
  ["Alemania", "🇩🇪", [
    {name:"M. Neuer", pos:"POR", num:1, matches:117, goals:0, isRare:true, age:38, club:"Bayern Munich", foot:"Diestro"},
    {name:"J. Musiala", pos:"MED", num:14, matches:25, goals:2, isRare:true, age:21, club:"Bayern Munich", foot:"Diestro"},
    {name:"K. Havertz", pos:"DEL", num:7, matches:42, goals:14, isRare:false, age:24, club:"Arsenal", foot:"Zurdo"}
  ]],
  ["Argentina", "🇦🇷", [
    {name:"L. Messi", pos:"DEL", num:10, matches:180, goals:106, isRare:true, age:36, club:"Inter Miami CF", foot:"Zurdo"},
    {name:"E. Martínez", pos:"POR", num:23, matches:36, goals:0, isRare:false, age:31, club:"Aston Villa", foot:"Diestro"},
    {name:"J. Álvarez", pos:"DEL", num:9, matches:28, goals:7, isRare:false, age:24, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Brasil", "🇧🇷", [
    {name:"Vinícius Jr.", pos:"DEL", num:7, matches:26, goals:3, isRare:true, age:23, club:"Real Madrid", foot:"Diestro"},
    {name:"Alisson", pos:"POR", num:1, matches:63, goals:0, isRare:false, age:31, club:"Liverpool", foot:"Diestro"},
    {name:"Rodrygo", pos:"DEL", num:11, matches:20, goals:4, isRare:false, age:23, club:"Real Madrid", foot:"Diestro"}
  ]],
  ["Francia", "🇫🇷", [
    {name:"K. Mbappé", pos:"DEL", num:10, matches:75, goals:46, isRare:true, age:25, club:"Real Madrid", foot:"Diestro"},
    {name:"A. Griezmann", pos:"MED", num:7, matches:127, goals:44, isRare:true, age:33, club:"Atlético Madrid", foot:"Zurdo"},
    {name:"M. Thuram", pos:"DEL", num:15, matches:16, goals:2, isRare:false, age:26, club:"Inter Milan", foot:"Diestro"}
  ]],
  ["España", "🇪🇸", [
    {name:"Pedri", pos:"MED", num:20, matches:18, goals:0, isRare:true, age:21, club:"FC Barcelona", foot:"Diestro"},
    {name:"Gavi", pos:"MED", num:9, matches:27, goals:5, isRare:false, age:19, club:"FC Barcelona", foot:"Diestro"},
    {name:"Rodri", pos:"MED", num:16, matches:48, goals:1, isRare:false, age:27, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Inglaterra", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", [
    {name:"H. Kane", pos:"DEL", num:9, matches:89, goals:62, isRare:true, age:30, club:"Bayern Munich", foot:"Diestro"},
    {name:"J. Bellingham", pos:"MED", num:10, matches:27, goals:2, isRare:true, age:20, club:"Real Madrid", foot:"Diestro"},
    {name:"B. Saka", pos:"DEL", num:7, matches:32, goals:11, isRare:false, age:22, club:"Arsenal", foot:"Zurdo"}
  ]],
  ["Portugal", "🇵🇹", [
    {name:"C. Ronaldo", pos:"DEL", num:7, matches:205, goals:128, isRare:true, age:39, club:"Al Nassr", foot:"Diestro"},
    {name:"B. Fernandes", pos:"MED", num:8, matches:63, goals:19, isRare:false, age:29, club:"Manchester Utd", foot:"Diestro"},
    {name:"R. Dias", pos:"DEF", num:4, matches:53, goals:2, isRare:false, age:26, club:"Manchester City", foot:"Diestro"}
  ]],
  ["Países Bajos", "🇳🇱", [
    {name:"V. van Dijk", pos:"DEF", num:4, matches:64, goals:7, isRare:true, age:32, club:"Liverpool", foot:"Diestro"},
    {name:"M. de Ligt", pos:"DEF", num:3, matches:43, goals:2, isRare:false, age:24, club:"Bayern Munich", foot:"Diestro"},
    {name:"F. de Jong", pos:"MED", num:21, matches:54, goals:2, isRare:false, age:26, club:"FC Barcelona", foot:"Diestro"}
  ]],
  ["Italia", "🇮🇹", [
    {name:"G. Donnarumma", pos:"POR", num:1, matches:60, goals:0, isRare:true, age:25, club:"PSG", foot:"Diestro"},
    {name:"F. Chiesa", pos:"DEL", num:14, matches:44, goals:7, isRare:false, age:26, club:"Juventus", foot:"Diestro"},
    {name:"N. Barella", pos:"MED", num:18, matches:51, goals:8, isRare:false, age:27, club:"Inter Milan", foot:"Diestro"}
  ]],
  ["Uruguay", "🇺🇾", [
    {name:"D. Núñez", pos:"DEL", num:9, matches:22, goals:8, isRare:false, age:24, club:"Liverpool", foot:"Diestro"},
    {name:"F. Valverde", pos:"MED", num:15, matches:55, goals:6, isRare:true, age:25, club:"Real Madrid", foot:"Diestro"},
    {name:"R. Bentancur", pos:"MED", num:6, matches:59, goals:1, isRare:false, age:26, club:"Tottenham", foot:"Diestro"}
  ]],
  ["Colombia", "🇨🇴", [
    {name:"J. Rodríguez", pos:"MED", num:10, matches:96, goals:27, isRare:true, age:32, club:"São Paulo", foot:"Zurdo"},
    {name:"L. Díaz", pos:"DEL", num:7, matches:45, goals:11, isRare:true, age:27, club:"Liverpool", foot:"Diestro"},
    {name:"D. Zapata", pos:"DEL", num:9, matches:34, goals:4, isRare:false, age:33, club:"Torino", foot:"Diestro"}
  ]],
  ["Estados Unidos", "🇺🇸", [
    {name:"C. Pulisic", pos:"DEL", num:10, matches:64, goals:28, isRare:true, age:25, club:"AC Milan", foot:"Diestro"},
    {name:"C. McKennie", pos:"MED", num:8, matches:49, goals:11, isRare:false, age:25, club:"Juventus", foot:"Diestro"},
    {name:"G. Reyna", pos:"MED", num:7, matches:24, goals:7, isRare:false, age:21, club:"Nott. Forest", foot:"Diestro"}
  ]],
  ["Canadá", "🇨🇦", [
    {name:"A. Davies", pos:"DEF", num:19, matches:44, goals:15, isRare:true, age:23, club:"Bayern Munich", foot:"Zurdo"},
    {name:"J. David", pos:"DEL", num:20, matches:45, goals:26, isRare:false, age:24, club:"Lille", foot:"Diestro"},
    {name:"M. Johnston", pos:"DEF", num:2, matches:34, goals:1, isRare:false, age:25, club:"Celtic", foot:"Diestro"}
  ]],
  ["Japón", "🇯🇵", [
    {name:"T. Kubo", pos:"MED", num:20, matches:31, goals:3, isRare:true, age:22, club:"Real Sociedad", foot:"Zurdo"},
    {name:"W. Endo", pos:"MED", num:6, matches:57, goals:3, isRare:false, age:31, club:"Liverpool", foot:"Diestro"},
    {name:"T. Minamino", pos:"DEL", num:10, matches:53, goals:18, isRare:false, age:29, club:"AS Monaco", foot:"Diestro"}
  ]],
  ["Corea del Sur", "🇰🇷", [
    {name:"H. Son", pos:"DEL", num:7, matches:117, goals:41, isRare:true, age:31, club:"Tottenham", foot:"Ambidextro"},
    {name:"H. Hwang", pos:"DEL", num:11, matches:59, goals:12, isRare:false, age:28, club:"Wolves", foot:"Diestro"},
    {name:"K. Lee", pos:"MED", num:18, matches:20, goals:4, isRare:false, age:23, club:"PSG", foot:"Zurdo"}
  ]],
  ["Marruecos", "🇲🇦", [
    {name:"H. Ziyech", pos:"DEL", num:7, matches:59, goals:22, isRare:true, age:31, club:"Galatasaray", foot:"Zurdo"},
    {name:"A. Hakimi", pos:"DEF", num:2, matches:70, goals:9, isRare:true, age:25, club:"PSG", foot:"Diestro"},
    {name:"Y. Bono", pos:"POR", num:1, matches:62, goals:0, isRare:false, age:33, club:"Al Hilal", foot:"Zurdo"}
  ]],
  ["Senegal", "🇸🇳", [
    {name:"S. Mané", pos:"DEL", num:10, matches:101, goals:40, isRare:true, age:32, club:"Al Nassr", foot:"Diestro"},
    {name:"E. Mendy", pos:"POR", num:16, matches:33, goals:0, isRare:false, age:32, club:"Al Ahli", foot:"Diestro"},
    {name:"I. Sarr", pos:"DEL", num:18, matches:58, goals:12, isRare:false, age:26, club:"Marseille", foot:"Diestro"}
  ]],
  ["Nigeria", "🇳🇬", [
    {name:"V. Osimhen", pos:"DEL", num:9, matches:28, goals:21, isRare:true, age:25, club:"Napoli", foot:"Diestro"},
    {name:"A. Lookman", pos:"DEL", num:11, matches:17, goals:4, isRare:false, age:26, club:"Atalanta", foot:"Diestro"},
    {name:"W. Ndidi", pos:"MED", num:4, matches:53, goals:0, isRare:false, age:27, club:"Leicester City", foot:"Diestro"}
  ]],
  ["Ghana", "🇬🇭", [
    {name:"M. Kudus", pos:"MED", num:20, matches:30, goals:9, isRare:true, age:23, club:"West Ham", foot:"Zurdo"},
    {name:"T. Partey", pos:"MED", num:5, matches:47, goals:13, isRare:false, age:30, club:"Arsenal", foot:"Diestro"},
    {name:"J. Ayew", pos:"DEL", num:9, matches:96, goals:22, isRare:false, age:32, club:"Crystal Palace", foot:"Diestro"}
  ]],
  ["Ecuador", "🇪🇨", [
    {name:"M. Caicedo", pos:"MED", num:23, matches:38, goals:3, isRare:true, age:22, club:"Chelsea", foot:"Diestro"},
    {name:"E. Valencia", pos:"DEL", num:13, matches:83, goals:40, isRare:true, age:34, club:"Internacional", foot:"Diestro"},
    {name:"P. Hincapié", pos:"DEF", num:3, matches:31, goals:1, isRare:false, age:22, club:"B. Leverkusen", foot:"Zurdo"}
  ]],
  ["Chile", "🇨🇱", [
    {name:"A. Sánchez", pos:"DEL", num:10, matches:160, goals:51, isRare:true, age:35, club:"Inter Milan", foot:"Diestro"},
    {name:"C. Bravo", pos:"POR", num:1, matches:145, goals:0, isRare:false, age:41, club:"Real Betis", foot:"Diestro"},
    {name:"B. Osorio", pos:"DEL", num:22, matches:10, goals:1, isRare:false, age:20, club:"Midtjylland", foot:"Zurdo"}
  ]],
  ["Perú", "🇵🇪", [
    {name:"P. Guerrero", pos:"DEL", num:9, matches:115, goals:39, isRare:true, age:40, club:"César Vallejo", foot:"Diestro"},
    {name:"A. Carrillo", pos:"MED", num:18, matches:98, goals:11, isRare:false, age:32, club:"Al Qadsiah", foot:"Diestro"},
    {name:"P. Gallese", pos:"POR", num:1, matches:102, goals:0, isRare:false, age:34, club:"Orlando City", foot:"Diestro"}
  ]],
  ["Costa Rica", "🇨🇷", [
    {name:"K. Navas", pos:"POR", num:1, matches:114, goals:0, isRare:true, age:37, club:"PSG", foot:"Diestro"},
    {name:"J. Campbell", pos:"DEL", num:12, matches:134, goals:27, isRare:false, age:31, club:"Alajuelense", foot:"Zurdo"},
    {name:"C. Borges", pos:"MED", num:5, matches:163, goals:27, isRare:false, age:36, club:"Alajuelense", foot:"Diestro"}
  ]],
  ["Australia", "🇦🇺", [
    {name:"M. Ryan", pos:"POR", num:1, matches:86, goals:0, isRare:false, age:32, club:"AZ Alkmaar", foot:"Diestro"},
    {name:"M. Leckie", pos:"DEL", num:7, matches:78, goals:14, isRare:false, age:33, club:"Melbourne City", foot:"Diestro"},
    {name:"H. Souttar", pos:"DEF", num:19, matches:22, goals:10, isRare:false, age:25, club:"Leicester City", foot:"Diestro"}
  ]],
  ["Suiza", "🇨🇭", [
    {name:"Y. Sommer", pos:"POR", num:1, matches:89, goals:0, isRare:false, age:35, club:"Inter Milan", foot:"Diestro"},
    {name:"G. Xhaka", pos:"MED", num:10, matches:121, goals:14, isRare:true, age:31, club:"B. Leverkusen", foot:"Zurdo"},
    {name:"B. Embolo", pos:"DEL", num:7, matches:63, goals:13, isRare:false, age:27, club:"AS Monaco", foot:"Diestro"}
  ]],
  ["Dinamarca", "🇩🇰", [
    {name:"K. Schmeichel", pos:"POR", num:1, matches:99, goals:0, isRare:false, age:37, club:"Anderlecht", foot:"Diestro"},
    {name:"C. Eriksen", pos:"MED", num:10, matches:126, goals:40, isRare:true, age:32, club:"Manchester Utd", foot:"Diestro"},
    {name:"R. Højlund", pos:"DEL", num:9, matches:10, goals:7, isRare:true, age:21, club:"Manchester Utd", foot:"Zurdo"}
  ]],
  ["Croacia", "🇭🇷", [
    {name:"L. Modrić", pos:"MED", num:10, matches:172, goals:24, isRare:true, age:38, club:"Real Madrid", foot:"Diestro"},
    {name:"M. Kovačić", pos:"MED", num:8, matches:97, goals:5, isRare:false, age:30, club:"Manchester City", foot:"Diestro"},
    {name:"J. Gvardiol", pos:"DEF", num:20, matches:27, goals:2, isRare:true, age:22, club:"Manchester City", foot:"Zurdo"}
  ]],
  ["Bélgica", "🇧🇪", [
    {name:"T. Courtois", pos:"POR", num:1, matches:102, goals:0, isRare:true, age:32, club:"Real Madrid", foot:"Zurdo"},
    {name:"K. De Bruyne", pos:"MED", num:7, matches:99, goals:26, isRare:true, age:32, club:"Manchester City", foot:"Diestro"},
    {name:"R. Lukaku", pos:"DEL", num:10, matches:113, goals:83, isRare:true, age:31, club:"AS Roma", foot:"Zurdo"}
  ]],
  ["Serbia", "🇷🇸", [
    {name:"V. Milinković", pos:"MED", num:20, matches:47, goals:7, isRare:false, age:29, club:"Al Hilal", foot:"Diestro"},
    {name:"D. Vlahović", pos:"DEL", num:18, matches:25, goals:13, isRare:true, age:24, club:"Juventus", foot:"Zurdo"},
    {name:"A. Mitrović", pos:"DEL", num:9, matches:87, goals:57, isRare:true, age:29, club:"Al Hilal", foot:"Diestro"}
  ]],
  ["Polonia", "🇵🇱", [
    {name:"W. Szczęsny", pos:"POR", num:1, matches:79, goals:0, isRare:false, age:34, club:"Juventus", foot:"Diestro"},
    {name:"P. Zieliński", pos:"MED", num:20, matches:86, goals:10, isRare:false, age:30, club:"Napoli", foot:"Diestro"},
    {name:"R. Lewandowski", pos:"DEL", num:9, matches:146, goals:82, isRare:true, age:35, club:"FC Barcelona", foot:"Diestro"}
  ]],
  ["Austria", "🇦🇹", [
    {name:"D. Alaba", pos:"DEF", num:8, matches:105, goals:15, isRare:true, age:31, club:"Real Madrid", foot:"Zurdo"},
    {name:"M. Arnautović", pos:"DEL", num:7, matches:111, goals:36, isRare:false, age:35, club:"Inter Milan", foot:"Diestro"},
    {name:"K. Laimer", pos:"MED", num:20, matches:32, goals:4, isRare:false, age:27, club:"Bayern Munich", foot:"Diestro"}
  ]],
  ["Gales", "🏴󠁧󠁢󠁷󠁬󠁳󠁿", [
    {name:"B. Davies", pos:"DEF", num:4, matches:84, goals:2, isRare:false, age:31, club:"Tottenham", foot:"Zurdo"},
    {name:"A. Ramsey", pos:"MED", num:10, matches:84, goals:21, isRare:true, age:33, club:"Cardiff City", foot:"Diestro"},
    {name:"D. James", pos:"DEL", num:20, matches:50, goals:7, isRare:false, age:26, club:"Leeds Utd", foot:"Diestro"}
  ]],
  ["Suecia", "🇸🇪", [
    {name:"V. Lindelöf", pos:"DEF", num:3, matches:64, goals:3, isRare:false, age:29, club:"Manchester Utd", foot:"Diestro"},
    {name:"E. Forsberg", pos:"MED", num:10, matches:86, goals:21, isRare:false, age:32, club:"NY Red Bulls", foot:"Diestro"},
    {name:"A. Isak", pos:"DEL", num:14, matches:42, goals:10, isRare:true, age:24, club:"Newcastle", foot:"Diestro"}
  ]],
  ["Noruega", "🇳🇴", [
    {name:"E. Haaland", pos:"DEL", num:9, matches:29, goals:27, isRare:true, age:23, club:"Manchester City", foot:"Zurdo"},
    {name:"M. Ødegaard", pos:"MED", num:10, matches:55, goals:3, isRare:true, age:25, club:"Arsenal", foot:"Zurdo"},
    {name:"A. Sørloth", pos:"DEL", num:19, matches:51, goals:17, isRare:false, age:28, club:"Villarreal", foot:"Zurdo"}
  ]],
  ["Escocia", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", [
    {name:"A. Robertson", pos:"DEF", num:3, matches:68, goals:3, isRare:true, age:30, club:"Liverpool", foot:"Zurdo"},
    {name:"J. McGinn", pos:"MED", num:7, matches:62, goals:18, isRare:false, age:29, club:"Aston Villa", foot:"Zurdo"},
    {name:"C. Adams", pos:"DEL", num:10, matches:28, goals:6, isRare:false, age:27, club:"Southampton", foot:"Diestro"}
  ]],
  ["Irán", "🇮🇷", [
    {name:"M. Taremi", pos:"DEL", num:9, matches:76, goals:42, isRare:true, age:31, club:"FC Porto", foot:"Diestro"},
    {name:"S. Azmoun", pos:"DEL", num:20, matches:75, goals:49, isRare:false, age:29, club:"AS Roma", foot:"Diestro"},
    {name:"A. Jahanbakhsh", pos:"MED", num:7, matches:77, goals:15, isRare:false, age:30, club:"Feyenoord", foot:"Diestro"}
  ]],
  ["Arabia Saudita", "🇸🇦", [
    {name:"S. Al-Dawsari", pos:"MED", num:10, matches:79, goals:22, isRare:true, age:32, club:"Al Hilal", foot:"Diestro"},
    {name:"S. Al-Faraj", pos:"MED", num:7, matches:73, goals:9, isRare:false, age:34, club:"Al Hilal", foot:"Zurdo"},
    {name:"Y. Al-Bulaihi", pos:"DEF", num:5, matches:42, goals:1, isRare:false, age:34, club:"Al Hilal", foot:"Zurdo"}
  ]],
  ["Catar", "🇶🇦", [
    {name:"A. Afif", pos:"DEL", num:11, matches:96, goals:29, isRare:true, age:27, club:"Al Sadd", foot:"Diestro"},
    {name:"H. Al-Haydos", pos:"MED", num:10, matches:175, goals:38, isRare:false, age:33, club:"Al Sadd", foot:"Diestro"},
    {name:"B. Khoukhi", pos:"DEF", num:16, matches:112, goals:21, isRare:false, age:33, club:"Al Sadd", foot:"Diestro"}
  ]],
  ["Emiratos Árabes", "🇦🇪", [
    {name:"A. Mabkhout", pos:"DEL", num:7, matches:114, goals:85, isRare:true, age:33, club:"Al Jazira", foot:"Diestro"},
    {name:"K. Eisa", pos:"POR", num:1, matches:70, goals:0, isRare:false, age:34, club:"Al Ain", foot:"Diestro"},
    {name:"A. Salmeen", pos:"MED", num:18, matches:58, goals:3, isRare:false, age:29, club:"Al Wasl", foot:"Diestro"}
  ]],
  ["Túnez", "🇹🇳", [
    {name:"Y. Msakni", pos:"MED", num:7, matches:97, goals:21, isRare:true, age:33, club:"Al Arabi", foot:"Diestro"},
    {name:"E. Skhiri", pos:"MED", num:17, matches:60, goals:3, isRare:false, age:29, club:"E. Frankfurt", foot:"Diestro"},
    {name:"M. Talbi", pos:"DEF", num:3, matches:34, goals:2, isRare:false, age:26, club:"Lorient", foot:"Diestro"}
  ]],
  ["Argelia", "🇩🇿", [
    {name:"R. Mahrez", pos:"MED", num:7, matches:89, goals:30, isRare:true, age:33, club:"Al Ahli", foot:"Zurdo"},
    {name:"I. Bennacer", pos:"MED", num:22, matches:48, goals:2, isRare:true, age:26, club:"AC Milan", foot:"Zurdo"},
    {name:"R. Bensebaini", pos:"DEF", num:21, matches:60, goals:6, isRare:false, age:29, club:"B. Dortmund", foot:"Zurdo"}
  ]],
  ["Egipto", "🇪🇬", [
    {name:"M. Salah", pos:"DEL", num:10, matches:96, goals:54, isRare:true, age:31, club:"Liverpool", foot:"Zurdo"},
    {name:"M. Elneny", pos:"MED", num:17, matches:97, goals:8, isRare:false, age:31, club:"Arsenal", foot:"Diestro"},
    {name:"A. Hegazy", pos:"DEF", num:6, matches:83, goals:2, isRare:false, age:33, club:"Al Ittihad", foot:"Diestro"}
  ]],
  ["Camerún", "🇨🇲", [
    {name:"A. Onana", pos:"POR", num:24, matches:38, goals:0, isRare:true, age:28, club:"Manchester Utd", foot:"Diestro"},
    {name:"V. Aboubakar", pos:"DEL", num:10, matches:99, goals:37, isRare:true, age:32, club:"Besiktas", foot:"Diestro"},
    {name:"A. Zambo Anguissa", pos:"MED", num:8, matches:52, goals:5, isRare:false, age:28, club:"Napoli", foot:"Diestro"}
  ]],
  ["Costa de Marfil", "🇨🇮", [
    {name:"S. Haller", pos:"DEL", num:22, matches:25, goals:8, isRare:true, age:29, club:"B. Dortmund", foot:"Diestro"},
    {name:"F. Kessié", pos:"MED", num:8, matches:69, goals:9, isRare:true, age:27, club:"Al Ahli", foot:"Diestro"},
    {name:"W. Zaha", pos:"DEL", num:9, matches:31, goals:5, isRare:false, age:31, club:"Galatasaray", foot:"Diestro"}
  ]],
  ["Mali", "🇲🇱", [
    {name:"Y. Bissouma", pos:"MED", num:8, matches:33, goals:3, isRare:true, age:27, club:"Tottenham", foot:"Diestro"},
    {name:"A. Haidara", pos:"MED", num:4, matches:36, goals:2, isRare:false, age:26, club:"RB Leipzig", foot:"Diestro"},
    {name:"H. Traoré", pos:"DEF", num:2, matches:54, goals:1, isRare:false, age:32, club:"Real Sociedad", foot:"Diestro"}
  ]],
  ["Sudáfrica", "🇿🇦", [
    {name:"P. Tau", pos:"DEL", num:10, matches:41, goals:14, isRare:true, age:29, club:"Al Ahly", foot:"Zurdo"},
    {name:"T. Zwane", pos:"MED", num:11, matches:40, goals:8, isRare:false, age:34, club:"Mamelodi Sundowns", foot:"Diestro"},
    {name:"R. Williams", pos:"POR", num:1, matches:38, goals:0, isRare:false, age:32, club:"Mamelodi Sundowns", foot:"Diestro"}
  ]],
  ["Nueva Zelanda", "🇳🇿", [
    {name:"C. Wood", pos:"DEL", num:9, matches:74, goals:34, isRare:true, age:32, club:"Nott. Forest", foot:"Diestro"},
    {name:"S. Thomas", pos:"MED", num:14, matches:22, goals:0, isRare:false, age:25, club:"Nantes", foot:"Diestro"},
    {name:"L. Cacace", pos:"DEF", num:13, matches:23, goals:1, isRare:false, age:23, club:"Empoli", foot:"Zurdo"}
  ]]
];

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
