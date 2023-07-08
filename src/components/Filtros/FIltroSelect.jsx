import Select from "react-select";

const FiltroSelect = ({options, chave, onChange, multi, placeholder}) => {
    // simplificando a vida passando o processamento de array para objeto para dentro do componente

    var optionsFiltro = options?.map((item) =>{
        return item[chave]
    })
    optionsFiltro = optionsFiltro.filter(function( element ) {
        return element !== undefined;
    });
    optionsFiltro = optionsFiltro && Array.from(optionsFiltro).sort()
    optionsFiltro = new Set(optionsFiltro)
    optionsFiltro = Array.from(optionsFiltro)
    optionsFiltro = optionsFiltro.map((valor) => {return {
        value: valor,
        label: valor}})

    return <Select 
        options={optionsFiltro}
        onChange={onChange}
        isMulti={multi} // ativa a selecção multipla
        placeholder={placeholder}
        styles={{ // forma bizarra de editar o css interno do elemento
            container:(baseStyles) => ({
                ...baseStyles,       
                maxWdth: 'auto',
                fontSize:'12px',
            }),
            control: (baseStyles) => ({
                ...baseStyles,                
                borderColor: 'rgba(128, 128, 128, 0.3)',
                borderRadius: '10px',
                minWidth:'10vw',
                maxWdth: 'auto',
                marginTop: '0px',
                marginBottom:'3px',
                height: '4vh',
                padding: '5px',                                            
            }),
            valueContainer:(baseStyles) => ({
                ...baseStyles,
                minWidth:'5vw',
                maxHeight:'4.5vh',
                overflowY:'scroll',                                        
            }),
            multiValue:(baseStyles) => ({
                ...baseStyles,                
                textOverflow:'none',
                objectFit: 'contain',
                wordBreak: 'break-word',
            }),
            indicatorsContainer:(baseStyles) => ({
                ...baseStyles,
                padding:'0px'
            }),
            indicatorSeparator:(baseStyles) => ({
                ...baseStyles,
                width:'0px',
                margin:'0px',
                padding:'0px'
            }),
            clearIndicator:(baseStyles) => ({
                ...baseStyles,
                padding:'1px'
            }),
            dropdownIndicator:(baseStyles) => ({
                ...baseStyles,
                padding:'1px'
            }),                     
            menu:(baseStyles) => ({
                ...baseStyles,
                minWidth:'10vw',
                width:'auto'
            }),                         
            placeholder:(baseStyles) => ({
                ...baseStyles,
                position:'absolute',
                top:'-3px',
            }),             
        }}
    />
}

export default FiltroSelect