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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
            <h1 className="text-xl font-bold text-primary">Подружка</h1>
          </div>
          <Icon name="User" size={24} className="text-muted-foreground" />
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {currentProcess === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
              <p className="text-muted-foreground">Выберите процесс для работы</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {processes.map((process) => (
                <Card 
                  key={process.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => setCurrentProcess(process.id)}
                >
                  <div className="space-y-3 text-center">
                    <div className={`${process.color} w-16 h-16 rounded-2xl mx-auto flex items-center justify-center`}>
                      <Icon name={process.icon as any} size={32} className="text-white" />
                    </div>
                    <p className="font-semibold text-sm leading-tight">{process.name}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">Совет дня</p>
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
              <h2 className="text-2xl font-bold mb-2">Сканирование товара</h2>
              <p className="text-muted-foreground">Отсканируйте штрих-код товара</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Введите штрих-код"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                />
                <Button onClick={handleScan} size="icon" className="shrink-0">
                  <Icon name="Search" size={20} />
                </Button>
              </div>

              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Camera" size={20} className="mr-2" />
                Открыть камеру
              </Button>
            </div>

            {scannedProduct && (
              <Card className="p-6 animate-scale-in">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="mb-2">{scannedProduct.category}</Badge>
                      <h3 className="font-bold text-lg">{scannedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Артикул: {scannedProduct.barcode}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Цена</p>
                      <p className="text-2xl font-bold text-primary">{scannedProduct.price} ₽</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Остаток</p>
                      <p className="text-2xl font-bold">{scannedProduct.stock} шт</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Minus" size={18} className="mr-2" />
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
              <h2 className="text-2xl font-bold mb-2">Инвентаризация</h2>
              <p className="text-muted-foreground">Учёт остатков товаров</p>
            </div>

            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-secondary/10 rounded-full mx-auto flex items-center justify-center">
                  <Icon name="ClipboardList" size={48} className="text-secondary" />
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">{inventoryCount}</p>
                  <p className="text-muted-foreground">товаров проверено</p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {mockProducts.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Остаток: {product.stock} шт</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => setInventoryCount(inventoryCount + 1)}
                    >
                      <Icon name="Check" size={16} className="mr-1" />
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
              <h2 className="text-2xl font-bold mb-2">Разборка коробок</h2>
              <p className="text-muted-foreground">Регистрация поступлений</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <Icon name="Package" size={48} className="text-white" />
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">{boxCount}</p>
                  <p className="text-muted-foreground">коробок разобрано сегодня</p>
                </div>
                <Button size="lg" className="w-full" onClick={() => setBoxCount(boxCount + 1)}>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Начать разборку новой коробки
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Последние поступления</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Коробка #1234</p>
                    <p className="text-sm text-muted-foreground">24 товара</p>
                  </div>
                  <Badge variant="outline">Сегодня</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">Коробка #1233</p>
                    <p className="text-sm text-muted-foreground">18 товаров</p>
                  </div>
                  <Badge variant="outline">Вчера</Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentProcess === 'assemble' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Сборка заказа</h2>
              <p className="text-muted-foreground">Подготовка заказов к выдаче</p>
            </div>

            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending">Ожидают</TabsTrigger>
                <TabsTrigger value="assembled">Собранные</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="space-y-3 mt-4">
                {mockOrders.filter(o => o.status === 'pending').map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <Badge className="bg-secondary">{order.items} товара</Badge>
                    </div>
                    <Button className="w-full">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Начать сборку
                    </Button>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="assembled" className="space-y-3 mt-4">
                {mockOrders.filter(o => o.status === 'assembled').map((order) => (
                  <Card key={order.id} className="p-4 border-green-200 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <Icon name="CheckCircle" size={24} className="text-green-600" />
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
              <h2 className="text-2xl font-bold mb-2">Выдача заказа</h2>
              <p className="text-muted-foreground">Передача заказа покупателю</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center">
                    <Icon name="QrCode" size={40} className="text-white" />
                  </div>
                  <p className="font-medium">Отсканируйте QR-код заказа</p>
                </div>
                
                <Input placeholder="Или введите номер заказа" />
                
                <Button className="w-full" size="lg">
                  <Icon name="Search" size={20} className="mr-2" />
                  Найти заказ
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold">Готовы к выдаче</h3>
              {mockOrders.filter(o => o.status === 'assembled').map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <Badge>{order.items} товара</Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Icon name="CheckCircle" size={18} className="mr-2" />
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