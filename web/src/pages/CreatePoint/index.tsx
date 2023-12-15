import { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
//import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import GoogleMapsApi from '../../components/GoogleMapsApi/googleMapsApi';

import axios from 'axios';
import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.svg'

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface ufResponse {
    sigla: string;
    nome: string;
}

interface cityResponse {
    nome: string;
}

function CreatePoint() {

    // Estado para array ou objeto, precisamos informar o tipo da variável
    const [items, setItems] = useState<Item[]>([]);
    const [names, setNames] = useState<ufResponse[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setNames(response.data);
        })
    }, [])

    useEffect(() => {
        // Carregar as cidades sempre que a UF mudar
        if (selectedUf === '0') {
            setCities([]);
        } else {
            axios.get<cityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            })
        }
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }



    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para a página principal
                </Link>
            </header>

            <form action="">
                <h1>Cadastro do ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input className='input1'
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endeço no mapa</span>
                    </legend>

                    <GoogleMapsApi />

                    {/*<MapContainer
                        center={[-25.4880189, -49.355163]}
                        zoom={15}
                        scrollWheelZoom={true}
                        >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-25.4880189, -49.355163]} />
                    </MapContainer>*/}

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {names.map(name => (
                                    <option key={name.sigla} value={name.sigla}>{name.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens de coleta abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset> <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>

            </form>
        </div>
    )
}

export default CreatePoint;