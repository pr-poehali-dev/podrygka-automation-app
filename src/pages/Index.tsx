import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProcessType = 'home' | 'scan' | 'inventory' | 'unbox' | 'assemble' | 'issue';

interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  stock: number;
  category: string;
}

interface Order {
  id: string;
  customer: string;
  items: number;
  status: 'pending' | 'assembled' | 'issued';
}

const Index = () => {
  const [currentProcess, setCurrentProcess] = useState<ProcessType>('home');
  const [scanInput, setScanInput] = useState('');
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);

  const mockProducts: Product[] = [
    { id: '1', name: 'Помада Matt Luxe №45', barcode: '4607086567890', price: 599, stock: 24, category: 'Макияж' },
    { id: '2', name: 'Тушь для ресниц Mega Volume', barcode: '4607086567891', price: 749, stock: 18, category: 'Макияж' },
    { id: '3', name: 'Крем для рук Питательный', barcode: '4607086567892', price: 299, stock: 45, category: 'Уход' },
  ];

  const mockOrders: Order[] = [
    { id: 'ORD-001', customer: 'Анна К.', items: 3, status: 'pending' },
    { id: 'ORD-002', customer: 'Мария П.', items: 5, status: 'assembled' },
    { id: 'ORD-003', customer: 'Елена С.', items: 2, status: 'pending' },
  ];

  const handleScan = () => {
    const product = mockProducts.find(p => p.barcode === scanInput);
    setScannedProduct(product || null);
    if (!product) {
      alert('Товар не найден');
    }
  };

  const processes = [
    { id: 'scan' as ProcessType, name: 'Сканирование', icon: 'Scan', color: 'bg-primary' },
    { id: 'inventory' as ProcessType, name: 'Инвентаризация', icon: 'ClipboardList', color: 'bg-secondary' },
    { id: 'unbox' as ProcessType, name: 'Разборка коробок', icon: 'Package', color: 'bg-primary' },
    { id: 'assemble' as ProcessType, name: 'Сборка заказа', icon: 'ShoppingCart', color: 'bg-secondary' },
    { id: 'issue' as ProcessType, name: 'Выдача заказа', icon: 'CheckCircle', color: 'bg-primary' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-100">
      <header className="glass-header sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentProcess !== 'home' && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentProcess('home')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            <h1 className="text-2xl font-bold text-primary">Подружка</h1>
          </div>
          <Icon name="User" size={24} className="text-muted-foreground" />
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {currentProcess === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-3 mb-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Добро пожаловать!</h2>
              <p className="text-muted-foreground text-lg">Выберите процесс для работы</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {processes.map((process) => (
                <Card 
                  key={process.id}
                  className="glass-card p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
                  onClick={() => setCurrentProcess(process.id)}
                >
                  <div className="space-y-4 text-center">
                    <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                      <Icon name={process.icon as any} size={40} className="text-white" />
                    </div>
                    <p className="font-bold text-base leading-tight">{process.name}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="glass-card p-5 border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                  <Icon name="Info" size={20} className="text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-base">Совет дня</p>
                  <p className="text-sm text-muted-foreground">
                    Сканируйте товары сразу при получении коробки для быстрой инвентаризации
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentProcess === 'scan' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Сканирование товара</h2>
              <p className="text-muted-foreground text-base">Отсканируйте штрих-код товара</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Input 
                  placeholder="Введите штрих-код"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  className="glass-card h-14 text-base"
                />
                <Button onClick={handleScan} size="icon" className="glass-button shrink-0 h-14 w-14">
                  <Icon name="Search" size={22} />
                </Button>
              </div>

              <Button className="glass-card w-full h-16 text-base font-semibold hover:shadow-xl transition-all" size="lg">
                <Icon name="Camera" size={24} className="mr-2" />
                Открыть камеру
              </Button>
            </div>

            {scannedProduct && (
              <Card className="glass-card p-8 animate-scale-in">
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="mb-3 text-sm px-3 py-1">{scannedProduct.category}</Badge>
                      <h3 className="font-bold text-xl mb-2">{scannedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Артикул: {scannedProduct.barcode}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 pt-4 border-t border-purple-200">
                    <div className="glass-card p-4 rounded-2xl">
                      <p className="text-sm text-muted-foreground mb-2">Цена</p>
                      <p className="text-3xl font-bold text-primary">{scannedProduct.price} ₽</p>
                    </div>
                    <div className="glass-card p-4 rounded-2xl">
                      <p className="text-sm text-muted-foreground mb-2">Остаток</p>
                      <p className="text-3xl font-bold">{scannedProduct.stock} шт</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <Button className="glass-button flex-1 h-14 text-base font-semibold">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить
                    </Button>
                    <Button className="glass-card flex-1 h-14 text-base font-semibold hover:shadow-lg transition-all">
                      <Icon name="Minus" size={20} className="mr-2" />
                      Списать
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {currentProcess === 'inventory' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Инвентаризация</h2>
              <p className="text-muted-foreground text-base">Учёт остатков товаров</p>
            </div>

            <Card className="glass-card p-8">
              <div className="text-center space-y-5">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <Icon name="ClipboardList" size={56} className="text-white" />
                </div>
                <div>
                  <p className="text-6xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{inventoryCount}</p>
                  <p className="text-muted-foreground text-lg">товаров проверено</p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {mockProducts.map((product) => (
                <Card key={product.id} className="glass-card p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-base mb-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Остаток: {product.stock} шт</p>
                    </div>
                    <Button 
                      className="glass-button h-12 px-5 font-semibold"
                      onClick={() => setInventoryCount(inventoryCount + 1)}
                    >
                      <Icon name="Check" size={18} className="mr-2" />
                      Проверено
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentProcess === 'unbox' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Разборка коробок</h2>
              <p className="text-muted-foreground text-base">Регистрация поступлений</p>
            </div>

            <Card className="glass-card p-8">
              <div className="text-center space-y-5">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <Icon name="Package" size={56} className="text-white" />
                </div>
                <div>
                  <p className="text-6xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{boxCount}</p>
                  <p className="text-muted-foreground text-lg">коробок разобрано сегодня</p>
                </div>
                <Button className="glass-button w-full h-16 text-base font-semibold" onClick={() => setBoxCount(boxCount + 1)}>
                  <Icon name="Plus" size={22} className="mr-2" />
                  Начать разборку новой коробки
                </Button>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-bold text-lg mb-4">Последние поступления</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-purple-200 last:border-0">
                  <div>
                    <p className="font-semibold text-base">Коробка #1234</p>
                    <p className="text-sm text-muted-foreground">24 товара</p>
                  </div>
                  <Badge className="text-sm px-3 py-1" variant="outline">Сегодня</Badge>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-purple-200 last:border-0">
                  <div>
                    <p className="font-semibold text-base">Коробка #1233</p>
                    <p className="text-sm text-muted-foreground">18 товаров</p>
                  </div>
                  <Badge className="text-sm px-3 py-1" variant="outline">Вчера</Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentProcess === 'assemble' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Сборка заказа</h2>
              <p className="text-muted-foreground text-base">Подготовка заказов к выдаче</p>
            </div>

            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="glass-card grid w-full grid-cols-2 h-14">
                <TabsTrigger value="pending" className="text-base font-semibold">Ожидают</TabsTrigger>
                <TabsTrigger value="assembled" className="text-base font-semibold">Собранные</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="space-y-4 mt-6">
                {mockOrders.filter(o => o.status === 'pending').map((order) => (
                  <Card key={order.id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-bold text-xl mb-1">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm px-3 py-2">{order.items} товара</Badge>
                    </div>
                    <Button className="glass-button w-full h-14 text-base font-semibold">
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Начать сборку
                    </Button>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="assembled" className="space-y-4 mt-6">
                {mockOrders.filter(o => o.status === 'assembled').map((order) => (
                  <Card key={order.id} className="glass-card p-6 border-2 border-green-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-xl mb-1">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                        <Icon name="CheckCircle" size={28} className="text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentProcess === 'issue' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Выдача заказа</h2>
              <p className="text-muted-foreground text-base">Передача заказа покупателю</p>
            </div>

            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <Icon name="QrCode" size={56} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg">Отсканируйте QR-код заказа</p>
                </div>
                
                <Input placeholder="Или введите номер заказа" className="glass-card h-14 text-base" />
                
                <Button className="glass-button w-full h-16 text-base font-semibold">
                  <Icon name="Search" size={22} className="mr-2" />
                  Найти заказ
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="font-bold text-xl">Готовы к выдаче</h3>
              {mockOrders.filter(o => o.status === 'assembled').map((order) => (
                <Card key={order.id} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-lg">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <Badge className="text-sm px-3 py-2">{order.items} товара</Badge>
                  </div>
                  <Button className="glass-button w-full h-14 text-base font-semibold">
                    <Icon name="CheckCircle" size={20} className="mr-2" />
                    Выдать заказ
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;