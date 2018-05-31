var application = angular.module("application")

.factory("SepetService", ['$rootScope','$http','$q','RESOURCES','NotifyService', function($rootScope,$http,$q,RESOURCES,NotifyService)
{
	var SepetObject = {
		items:[],
		total:null,
		/**
		 * ÜRÜN SEPETE OBJECT OLARAK EKLENİR 
		 * @param {[object]}
		 * Sepet'e ürün ekleme methodu
		 * sepette başka ürün var mı yok kontrol eder varsa, idler aynıysa mikarı eklenen ürünün miktarı kadar arttırır.
		 */
		add:function(product)
		{

			var newproduct= {
				Description:product.Description,
				DisplayName:product.DisplayName,
				ExtendedPrice:product.ExtendedPrice.replace(",","."),
				IsTakeAwayOnly:product.IsTakeAwayOnly,
				ListPrice:product.ListPrice,
				ProductGroup:product.ProductGroup,
				ProductId:product.ProductId,
				Miktar:parseInt(product.Miktar)
			};

			var that = this;
			if(that.items.length ===0)
			{
				that.items.push(newproduct);
				NotifyService.add(newproduct.Miktar+" Adet "+newproduct.DisplayName+" Eklendi");
			}
			else
			{
				var index = findWithAttr(that.items,"ProductId", newproduct.ProductId);
				if(index ===-1)
				{
					that.items.push(newproduct);
					NotifyService.add(newproduct.Miktar+" Adet "+newproduct.DisplayName+" Eklendi");
				}
				else
				{
					that.items[index].Miktar += newproduct.Miktar;
					NotifyService.add(newproduct.Miktar+" Adet "+newproduct.DisplayName+" Eklendi");
				}
			}
			that.calculateTotal(newproduct.ProductId);
		},
		/**
		 * ID'Sİ GİRİLEN ÜRÜN SEPETTEN KALDIRILIR.
		 * @param  {int}
		 * Sepetteki ürünü product_id si ile bulup siler, bu işlem ürünü miktar gözetmeksizin kaldırır.
		 */
		remove:function(product_id)
		{
			var that = this;
			if(that.items.length !==0)
			{
				var index = findWithAttr(that.items,"ProductId", product_id);
				if(index !==-1)
				{
					NotifyService.add(that.items[index].DisplayName+" isimli yemek silindi.");
					that.items.splice(index,1);

				}
			}
			that.calculateTotalforAll();
		},
		/**
		 * ID'Sİ GİRİLEN ÜRÜNÜN MİKTARINI DEĞİŞTİR.
		 * 0 GİRİLDİĞİNDE ÜRÜN SEPETTEN SİLİNİR
		 * Sepetteki ürünlerin miktarlarını günceller.
		 * Yeni girilen miktarın, o ürün için tutarını yeniden hesaplayan calculateTotal() methodunu çağırır.
		 */
		updateMiktar:function(product_id,miktar)
		{
			var that = this;
			miktar = parseInt(miktar);
			if(that.items.length !==0)
			{
				var index = findWithAttr(that.items,"ProductId", product_id);
				if(index !==-1)
				{
					if(miktar===0)
					{
						NotifyService.add(that.items[index].DisplayName+" isimli yemek silindi.");
						that.items.splice(index,1);
						$rootScope.urunCount = that.items.length;
					}
					else
					{
						that.items[index].Miktar = miktar;
						that.calculateTotal(product_id);
						NotifyService.add(that.items[index].DisplayName+" isimli yemeğin adeti "+that.items[index].Miktar+" olarak güncellendi.");
					}
				}
			}
		},
		/**
		 * ID'Sİ GİRİLEN ÜRÜNÜN TUTARINI HESAPLA
		 * @param  {int}
		 * Ürünlerde değişiklik olduğunda bu method çağırılır ve sadece product_id'si girilen ürünün
		 * tutarı hesaplanır.
		 */
		calculateTotal:function(product_id)
		{
			var that = this;
			if(that.items.length !==0)
			{
				var index = findWithAttr(that.items,"ProductId", product_id);
				if(index !==-1)
				{
					that.items[index].Total = ((parseFloat(that.items[index].ListPrice.replace(",","."))*that.items[index].Miktar).toFixed(2)).replace(".",",");
				}
			}
			that.calculateTotalforAll();
		},
		/**
		 * TOPLAM TUTAR HESAPLA
		 * SepetService.items içindeki bütün objelere ait Total propertysindeki değerleri alır toplar 
		 * ve ApiService.total'ı günceller böylece toplam tutar hesaplanmış olur
		 */
		calculateTotalforAll:function()
		{
			var that = this;
			if(that.items.length !==0)
			{
				var _total=0;
				angular.forEach(that.items,function(item,k)
				{
					_total= parseFloat(_total) + parseFloat(item.Total.replace(",","."));
				})
				that.total = _total.toFixed(2).replace(".",",");
			}
			$rootScope.urunCount = that.items.length;
		},
		all:function()
		{
			return {urunler:this.items, total:this.total};
		}
	};
	return SepetObject;
}])