function c(a,b){
  const c=document.querySelector(`li[alt="${a}"]>a.collapsible-header`);
  c?(c.click(),setTimeout(b,1500)):alert("Menu tidak ditemukan: "+a)
}
function d(a){
  const b=document.evaluate(a,document,null,9,null).singleNodeValue;
  b&&b.click()
}
function e(a,b){
  const c=document.evaluate(a,document,null,9,null).singleNodeValue;
  c&&(c.value=b)
}
let f=prompt("Pilih menu:\n1 = Approval Pengisian\n2 = Approval Opname","1"),
    g="1"===f?"Cro/pengisianApproval":"2"===f?"Cro/opnameApproval":null;
if(!g)return alert("Pilihan tidak valid!");
let h=parseInt(prompt("Masukkan jumlah pengulangan:","1"),10);
if(isNaN(h)||h<1)return alert("Jumlah pengulangan tidak valid!");
let i=0;
function j(){
  if(i>=h)return alert("Selesai "+h+" kali. Kembali ke menu."),void c(g,()=>{});
  i++,
  d("//td[13]/a"),
  setTimeout(()=>{
    e('//*[@id="keterangan"]',"OK"),
    setTimeout(()=>{
      d('//a[@class="waves-effect waves-light btn btn-small green accent-4 
