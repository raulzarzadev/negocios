import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ScrollDialog() {

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button
                size="small"
                color="primary"
                onClick={handleClickOpen('paper')}
            >
                Aviso de privacidad
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Aviso de privacidad</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <h4>
                            AVISO DE PRIVACIDAD  “RAÚL ZARZA SANTILLAN.”

                        </h4>
                        <p>
                            RAÚL ZARZA SANTILLAN,  consciente de la importancia de proteger sus datos personales y en cumplimiento a la legislación aplicable y vigente, pone a disposición el presente AVISO DE PRIVACIDAD, de conformidad a los siguientes preceptos:
                        </p>
                        <h4>
                            I.- IDENTIDAD Y DOMICILIO DEL RESPONSABLE.-
                        </h4>
                        <p>
                            RAÚL ZARZA SANTILLAN, es una persona Física, con personalidad jurídica y patrimonio propio,  que ejerce actividades de  Publicidad (software as a service), con domicilio fiscal ubicado en: Calzada Misterios, Número  363, Interior 1, Colonia Industrial, Alcaldía Gustavo A. Madero. Código Postal  07800, Ciudad de México.
                        </p>
                        <h4>
                            II.-  OBTENCIÓN DE DATOS PERSONALES.-
                        </h4>
                        <p>
                            RAÚL ZARZA SANTILLAN, podrá recabar sus datos personales de distintas formas:
                            <br />
                            a) Cuando usted  los proporciona directamente por cualquier medio;
                            <br />
                            b) Cuando visita su sitio de Internet, utilice sus  servicios en línea, por teléfono  o redes sociales; y
                            <br />
                            c) Cuando se obtiene información a través de otras fuentes que están permitidas por la ley.

                        </p>
                        <h4>
                            III.- LA INFORMACIÓN QUE SE RECABA.-
                        </h4>
                        <p>
                            RAÚL ZARZA SANTILLAN, podrá recabar, los siguientes datos personales:
                            <br />

                            a) Nombre;
                            <br />
                            b) Edad;
                            <br />
                            c) Domicilio;
                            <br />
                            d) Números de teléfono, (celular y local);
                            <br />
                            e) Registro Federal de Contribuyentes;
                            <br />
                            f) Correo Electrónico;
                            <br />
                            g) Firma;
                            <br />
                            h) Puesto laboral.
                            <br />
                            i) De giros comerciales.
                            <br />
                            j) De negocios.
                            <br />
                            k) Empresariales.

                        </p>
                        <h4>
                            IV.- LA FINALIDAD DE TRATAMIENTO DE LOS DATOS PERSONALES.-
                        </h4>
                        <p>
                            La finalidad de la obtención, acceso, manejo, aprovechamiento, transferencia, disposición, divulgación o almacenamiento de los datos personales, incluyendo los Datos Personales Sensibles, será:
                            <br />
                            a) Usarla para ponerse en contacto por medio de teléfono, correo electrónico, publicaciones impresas o por cualquier otro medio, con su titular y/o representante legal o con sus colaboradores, con el objeto de hacerle llegar información de publicidad, comercial, económica, cursos de capacitación o cualquier información oportuna para el buen desarrollo de sus actividades como comerciante, empresario, Industrial y/o prestador de servicios.
                            <br />
                            b) Además, para invitarlo a eventos celebrados por  RAÚL ZARZA SANTILLAN, eventos de publicidad, comerciales, cursos, ferias o exposiciones, misiones comerciales, reuniones de trabajo en materia de publicidad, eventos turísticos, culturales y/o artísticos, presentación de servicios propios relacionados con la publicidad.
                            <br />
                            c) Con el propósito de ponerse en contacto por medio de teléfono, correo electrónico, publicaciones impresas o por cualquier otro medio, con su titular y/o representante legal o con sus colaboradores, para hacerle de su conocimiento que RAÚL ZARZA SANTILLAN, les ofrece servicios en materia de publicidad (software as a service).
                            <br />
                            d) Podremos utilizar sus datos personales, para poner en contacto a personas físicas o morales, que requieran comprar o vender productos o prestar servicios dentro del portal denominado https://negociosdelbarrio.com/villas, que es propiedad y esta operado por RAÚL ZARZA SANTILLAN , con la finalidad de favorecer la economía en los sectores, comerciales, empresariales, industriales y de servicios.
                        </p>
                        <h4>
                            V.- LIMITACIÓN DE USO O DIVULGACIÓN DE LOS DATOS PERSONALES.-
                        </h4>
                        <p>
                            RAÚL ZARZA SANTILLAN  cuenta con las medidas de seguridad: administrativas, técnicas y físicas necesarias e implementadas conforme a sus políticas y procedimientos de seguridad, para asegurar sus Datos Personales contra un uso indebido o ilícito, un acceso no autorizado, o contra la pérdida, alteración, robo o modificación de sus Datos Personales, quedando prohibido su divulgación ilícita y limitando su tratamiento conforme a lo previsto en el presente Aviso de Privacidad y en la legislación aplicable.
                        </p>
                        <h4>
                            VI.- PROCEDIMIENTO DE ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN, (PROCEDIMIENTO ARCO).-
                        </h4>
                        <p>
                            El procedimiento para ejercer los derechos de acceso, rectificación, cancelación u oposición al tratamiento de sus datos personales, consiste en enviar un correo electrónico con su petición a la dirección de correo electrónico raulzarza.dev@gmail.com.  Por lo que RAÚL ZARZA SANTILLAN se compromete a dar contestación a su petición dentro de los 06 (seis) días hábiles posteriores a la recepción de su correo electrónico. Su solicitud y/o petición deberá contener al menos:
                            <br />
                            a) Su nombre y domicilio;
                            <br />
                            b) Medio para recibir comunicaciones;
                            <br />
                            c) Su identificación Oficial, o documentos que acrediten la personalidad de la persona moral y el poder del representante legal;
                            <br />
                            d)  La descripción clara y precisa de los datos personales respecto de los que se busca ejercer alguno de los derechos ARCO, (DERECHOS DE ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN).
                            <br />
                            e) Cualquier otro elemento o documento que facilite la localización de sus Datos Personales.
                        </p>
                        <h4>
                            VII.- TRANSFERENCIA DE DATOS.-
                        </h4>
                        <p>
                            Las transferencias de datos que posiblemente realice RAÚL ZARZA SANTILLAN, de sus datos personales, será exclusivamente a proveedores o colaboradores de servicios seleccionados, con los que RAÚL ZARZA SANTILLAN tiene celebrados convenios o contratos, y documentos de confidencialidad y de protección de datos personales, en el entendido que sólo se les permitirá el acceso a sus datos personales para cumplir con la prestación de los servicios contratados o convenidos, y/o para los mismos fines establecidos en este Aviso de Privacidad. En ningún otro caso se comercializara, venderá,  o se rentara información personal sobre usted a un tercero, sin su consentimiento previo. Cualquier transferencia de datos personales que RAÚL ZARZA SANTILLAN realice, será únicamente para los fines permitidos por las leyes, de conformidad con la legislación aplicable; se considera que el titular de los datos personales consiente tácitamente el tratamiento de sus datos, si no manifiesta su oposición. Los datos personales que usted proporcione a RAÚL ZARZA SANTILLAN, podrán compilarse y fijarse en una base de datos propiedad exclusiva de RAÚL ZARZA SANTILLAN. Las ligas a sitios externos de este portal, no son responsabilidad de RAÚL ZARZA SANTILLAN, por lo que no se asume responsabilidad alguna con respecto al contenido y políticas de privacidad en dichos sitios.
                        </p>
                        <h4>
                        VIII.- PROCEDIMIENTO PARA REALIZAR CAMBIOS AL AVISO DE PRIVACIDAD.- RAÚL ZARZA SANTILLAN
                        </h4>
                        <p>
                        RAÚL ZARZA SANTILLAN se reserva el derecho de cambiar el presente aviso de privacidad en cualquier momento; en caso de existir algún cambio al presente aviso de privacidad, se le comunicara a los usuarios dicho cambio en la página web https://negociosdelbarrio.com/villas, publicando una nota visible del cambio de referencia en dicho sitio web.
                        </p>
                        <h4>
                        IX.- PROCEDIMIENTO PARA REALIZAR CAMBIOS AL AVISO DE PRIVACIDAD.- RAÚL ZARZA SANTILLAN
                        </h4>
                        <p>
                        Las leyes y regulaciones de otros países pueden imponer diferentes requerimientos para la protección de la información en general y de los datos personales que se recolectan a través de internet; RAÚL ZARZA SANTILLAN, opera en el territorio Mexicano y todos los asuntos relacionados con su página web son regidos por las Leyes Mexicanas, si Usted está ubicado en algún otro país distinto a México y  contacta a RAÚL ZARZA SANTILLAN, por favor tome en cuenta que cualquier información que Usted le proporcione será transferida a México, y al momento de ingresar su información o datos personales, Usted autoriza esta transferencia y la aceptación del presente aviso de privacidad.
                        </p>
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                    
                </DialogActions>
            </Dialog>
        </div >
    );
}
