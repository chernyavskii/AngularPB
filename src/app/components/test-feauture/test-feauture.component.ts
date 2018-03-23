import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/finally';
import {Product} from '../../models/Product';
import {Document} from '../../models/Document';
import {typeOfDocument} from '../../data/data';

@Component({
  selector: 'app-test-feauture',
  templateUrl: './test-feauture.component.html',
  styleUrls: ['./test-feauture.component.css']
})
export class TestFeautureComponent implements OnChanges {

  @Input()
  user = new User();
  product = [];
  items: Product[] = [];
  tnDocument = false;

  documentForm: FormGroup;
  typeOfDocument = typeOfDocument;
  elementOfType: any;
  index_: number;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.createForm();
    this.rebuildForm();
  }

   ngOnChanges() {
      this.rebuildForm();
    }

  rebuildForm() {
/*
    this.documentForm.removeControl('products');
*/
    this.setAddresses(this.product);
  }

  addLair() {
    this.products.push(this.fb.group({
        name: '',
        measure: '',
        price: '',
        packageNumber: '',
        weight: '',
        note: ''
      }
    ));
/*
    this.documentForm.addControl('testControl', new FormControl());
*/
  }


  setAddresses(addresses: Product[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.documentForm.setControl('products', addressFormArray);
  }

  cmdTest() {
    this.products.push(this.fb.group({
      name: '',
      measure: '',
      price: '',
      note: '',
      weight: ''
      }
    ));

    /*
        this.documentForm.removeControl('products');
    */
  }

  createForm() {
    this.documentForm = this.fb.group({
      typeOfDocument: this.typeOfDocument,
      products: this.fb.array([(
        this.fb.group({
            name: '',
            measure: '',
            price: '',
            packageNumber: '',
            weight: '',
            note: ''
          }
        ))]
      ),
    });
  }

  get products(): FormArray {
    return this.documentForm.get('products') as FormArray;
  }

  qqqwerty() {
    console.log(this.documentForm.value);
  }

  searchIndex() {
    const nameControl = this.documentForm.get('typeOfDocument');
    this.index_ = nameControl.value;
    const elementOfArray = this.typeOfDocument.find(i => i.id == nameControl.value);
    this.elementOfType = elementOfArray;
  }

  get secretLairs(): FormArray {
    return this.documentForm.get('products') as FormArray;
  }

  setProducts(products: Product[]) {
    console.log('mish');
    const productsFGs = products.map(product => this.fb.group(product));
    console.log(productsFGs);
    const productFormArray = this.fb.array(productsFGs);
    this.documentForm.setControl('products', productFormArray);
  }


  /*addProduct() {
    this.secretLairs.push(this.fb.group(new Product()));
    console.log(this.secretLairs);
  }*/

/*
  onSubmit() {
/!*
    this.product = this.prepareSaveHero();
*!/
   /!* this.heroService.updateHero(this.hero).subscribe(/!* error handling *!/);
    this.rebuildForm();*!/
  }

  prepareSaveHero() {
    const formModel = this.documentForm.value;
    console.log(formModel);
    // deep copy of form model lairs
    const secretLairsDeepCopy: Product[] = formModel.secretLairs.map((product: Product) => {
      Object.assign({}, product);
    });

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values


  }*/
}
