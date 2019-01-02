export default {
  template: `
   <app-page title="Impostazioni">
     <template slot="actions">
       <app-nav-action icon="md-menu" v-on:action="alert('ciao')"></app-nav-action>
     </template>
    <ons-list>
      <ons-list-header>Generali</ons-list-header>
      <ons-list-item expandable v-on:click="document.getElementById(app.data.defaultPage).checked = true">Sezione all'avvio
      <div class="expandable-content">
        <span v-for="category in $root.menu.categories">
          <ons-list-item v-for="element in category.elements" v-on:click="app.data.defaultPage=element.page" tappable>
            <label class="left">
              <ons-radio name="color" :input-id="element.page"></ons-radio>
            </label>
            <label :for="element.name" class="center">
              {{ element.name }}
            </label>
          </ons-list-item>
        </span>
      </div>

      </ons-list-item>
      <ons-list-header>Informazioni</ons-list-header>
    </ons-list>
   </app-page>`
}