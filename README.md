# Validador de formularios
---
Validador genérico de formularios en javascript.

## Instalación
---
Para instalar la librería simplemente debes descargartela desde npm

```
    npm install vfes-validator
```

## Como funciona
---
A continuación se explicará en dos partes como funciona la librería:

### HTML
En la parte del HTML tenemos un formulario normal y corriente en el que dividimos los campos en diferentes cajas.  

Hay que tener en cuenta lo siguiente:
 - Los inputs siempre tienen que tener un atributo `name` que identifique el campo, ya que se va a utilizar en el javascript.
 - A la hora de mostrar los mensajes de error de la validación no importa el elemento de HTML que se utilice (`<span>`, `<p>`...), lo importante es que lleve el atributo `data-form-message`. Este elemento puede estar dentro de la caja que contiene el input o fuera, pero si está fuera el atributo debe tener como valor el name del input.

 A continuación un pequeño ejemplo del HTML:

```html
<form id="form1" action="/" method="POST">
    <fieldset>
        <legend>Legend</legend>
        <div>
            <label for="textFieldExample">Label: </label>
            <input type="text" name="textFieldExample" placeholder="Escribe algo" />
        </div>
        <div>
            <label for="nifFieldExample">NIF: </label>
            <input type="text" name="nifFieldExample" placeholder="Ej: 99999999Z" />
            <p data-form-message></p>
        </div>
        <div>
            <input type="submit" value="Input submit" />
        </div>
    </fieldset>
</form>

<p data-form-message="textFieldExample"></p>
```
<br>

### Javascript

A continuación tienes un pequeño ejemplo de javascript basado en el anterior HTML para inicalizar el validador.

```javascript
    const form = document.getElementById('form1');

    const validator = new vfes._validator(form, {
        rules: {
            textFieldExample: {
                required: true,
                minlength: 2,
                maxlength: 8
            },
            nifFieldExample: {
                nif: true
            }
        },
        messages: {
            textFieldExample: {
                required: "Debe rellenar este campo",
                minlength: "El texto debe tener mínimo 2 caracteres",
                maxlength: "El texto debe tener máximo 8 caracteres"
            },
            nifFieldExample: {
                nif: "Debe escribir un NIF válido. Pj: 99999999Z"
            }
        }
    });

    validator.init();
```
<br>

#### Rules

Las reglas se pasan en un **object** y se debe asociar el name del input con el nombre de las reglas existentes. El formato es el siguiente:

```javascript
    rules: {
        inputName: {
            ruleName: value
        }
    }
```

Las reglas disponibles por defecto son las siguientes:

|Rule Name       |Value Type                     |Description              |
|----------------|-------------------------------|-------------------------|
|`cif`           |**boolean**                    | Formato de CIF          |
|`cp`            |**boolean**                    | Formato de código postal|
|`digits`        |**boolean**                    | Solo dígitos            |
|`email`         |**boolean**                    | Formato email           |
|`maxlength`     |**number**                     | Tamaño máximo           |
|`minlength`     |**number**                     | Tamaño mínimo           |
|`nie`           |**boolean**                    | Formato de NIE          |
|`nif`           |**boolean**                    | Formato de NIF          |
|`required`      |**boolean**                    | Campo obligatorio       |



#### Mensajes de error
Para añadir mensajes tenemos que incluir el objecto ``messages`` dentro de las opciones del validador. Su formato es el siguiente:

```javascript
    messages: {
        inputName: {
            ruleName: 'Mensaje de error'
        }
    }
```

Por defecto existen diferentes mensajes predefinidos para las reglas que xisten por defecto.

A continuación se listan los mensajes por defecto que existen:
 - `cif`: CIF incorrecto.
 - `cp`: Código postal incorrecto.
 - `digits`: Sólo puede escribir números.
 - `email`: Formato de email incorrecto.
 - `maxlength`: (n) caracteres como máximo.
 - `minlength`: (n) caracteres como mínimo.
 - `nie`: NIE incorrecto.
 - `nif`: NIF incorrecto.
 - `required`: Campo obligatorio.

#### Otras opciones

Podemos añadir varias opciones más al validador de las antes mencionadas. Una de ellas es el **object** ``customRules``, que nos permite crear nuestras propias reglas de validación.  

Los parámetros que nos devuelve el validador para ejecutar nuestra **customRule** son el ``input`` y el valor de la regla. El formato es el siguiente:  

```javascript
    //optional object
    customRules: {
        customRuleName: (input, ruleValue) => {
            return input.value === ruleValue;
        }
    },
    rules: {
        inputName: {
            customRuleName: "customValue"
        }
    },
    messages: {
        inputName: {
            customRuleName: "Los valores no coinciden"
        }
    }
```

Por otro lado, tenemos ``onfocusout`` lo que nos permite validar cada input al perder el foco. Por defecto se valida tras pulsar el botón de submit.  

```javascript
{
    //optional object
    onfocusout: true
}
```

Por último, si queremos añadir una clase de error cuando la validación sea incorrecta añadiremos ``errorClass`` a las opciones del validador.  

```javascript
{
    //optional object
    errorClass: "errorClass"
}
```
