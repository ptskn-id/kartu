/* Pembuat kartu ID SKN: sisi depan & belakang. Butuh data.js (sknQR, sknInisial, sknNomor) dan kartu.css. */
(function () {
  var VISI = "We serve those<br>who serve others";
  function aman(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  window.sknAman = aman;

  var siluet = '<svg viewBox="0 0 100 106" aria-hidden="true"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#3a4d78"/><stop offset="1" stop-color="#1b2740"/></linearGradient></defs>' +
    '<circle cx="50" cy="30" r="19" fill="url(#sg)"/><path d="M8 106C8 76 28 58 50 58s42 18 42 48z" fill="url(#sg)"/></svg>';

  /* tautQR = true: QR jadi tautan (untuk PDF). ketQR = tulisan kecil di bawah QR. */
  window.sknDepan = function (o, D, tautQR, ketQR) {
    var url = D.dasar + "?id=" + o.id;
    var orang = o.foto ? '<img src="' + aman(o.foto) + '" alt="Foto ' + aman(o.nama) + '" style="object-position:' +
      aman(o.fokus || "50% 20%") + '">' : siluet + '<div class="inisial">' + aman(sknInisial(o.nama)) + '</div>';
    var kode = sknQR(url) + '<div>' + aman(ketQR || "Pindai kontak") + '</div>';
    return '<div class="tag"><div class="zona"><img class="latar" src="ikon.png" alt="">' +
      '<div class="merek"><img src="logo.png" alt="SKN"><i></i><img class="uni" src="unistar.png" alt="Unistar Cellular"></div><div class="visi">' + VISI + '</div>' +
      '<div class="orang' + (o.foto ? (o.potong ? " potong" : " bingkai") : "") + '">' + orang + '</div></div>' +
      '<div class="garis"></div><div class="strip"><div class="info">' +
      '<div class="nama' + (o.nama.length > 14 ? " panjang" : "") + '">' + aman(o.nama) + '</div>' +
      '<div class="jab">' + aman(o.jabatan) + '</div>' +
      (o.wilayah ? '<div class="wil">Wilayah ' + aman(o.wilayah) + '</div>' : "") + '</div>' +
      (tautQR ? '<a class="kode" href="' + url + '">' + kode + '</a>' : '<div class="kode">' + kode + '</div>') +
      '</div></div>';
  };

  window.sknBelakang = function (D) {
    var web = D.kantor.web.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return '<div class="tag belakang"><img class="latar" src="ikon.png" alt="">' +
      '<div class="teks"><blockquote>' + VISI + '</blockquote><hr>' +
      '<div class="pt">PT Satelit Komunika Nusantara</div><div class="web">' + aman(web) + '</div>' +
      '<div class="temu">Bila menemukan kartu ini, mohon hubungi <b>' + sknNomor(D.kantor.wa) + '</b></div></div></div>';
  };
})();
